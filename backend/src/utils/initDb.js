const db = require('../db');

async function initDb() {
  try {
    const result = await db.query('SELECT 1 as connection_test');
    if (result && result.rows.length > 0) {
      console.log('✅ PostgreSQL database connection established successfully.');
      return true;
    }
  } catch (error) {
    console.error('❌ PostgreSQL database connection failed during startup:', error.message);
    console.error('⚠️ Ensure the PostgreSQL container/service is running and accessible.');
    return false;
  }
}

module.exports = {
  initDb
};
