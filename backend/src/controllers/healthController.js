const db = require('../db');

async function getHealth(req, res) {
  try {
    const result = await db.query('SELECT 1 as health_check');
    if (result && result.rows.length > 0) {
      return res.status(200).json({
        status: 'healthy',
        service: 'f1-review-hub-backend',
        database: 'connected'
      });
    }
    throw new Error('Database query returned empty result');
  } catch (err) {
    console.error(`❌ Health Check Failed: ${err.message}`);
    return res.status(503).json({
      status: 'unhealthy',
      service: 'f1-review-hub-backend',
      database: 'disconnected'
    });
  }
}

module.exports = {
  getHealth
};
