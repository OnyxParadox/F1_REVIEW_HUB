const db = require('../db');

async function getHealth(req, res) {
  let dbConnected = false;
  let dbError = null;

  try {
    const result = await db.query('SELECT 1 as health_check');
    if (result && result.rows.length > 0) {
      dbConnected = true;
    }
  } catch (err) {
    dbError = err.message;
  }

  res.status(200).json({
    status: 'ok',
    service: 'F1 Review Hub API',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    database: {
      connected: dbConnected,
      error: dbError
    },
    environment: process.env.NODE_ENV || 'development'
  });
}

module.exports = {
  getHealth
};
