require('dotenv').config();
const app = require('./app');
const { initDb } = require('./utils/initDb');

const PORT = process.env.PORT || 5000;

async function startServer() {
  console.log('🏎️  Starting F1 Review Hub REST API Server...');

  // Initialize Database / Schema if needed
  await initDb();

  const server = app.listen(PORT, () => {
    console.log(`====================================================`);
    console.log(`🚀 F1 Review Hub API running on port ${PORT}`);
    console.log(`📡 Health check: http://localhost:${PORT}/api/health`);
    console.log(`🏎️  API Root:     http://localhost:${PORT}/api`);
    console.log(`====================================================`);
  });

  // Graceful shutdown handling
  const shutdown = (signal) => {
    console.log(`\n🛑 Received ${signal}. Gracefully shutting down F1 Review Hub server...`);
    server.close(() => {
      console.log('✅ Server closed. Exiting process.');
      process.exit(0);
    });
  };

  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT', () => shutdown('SIGINT'));
}

startServer();
