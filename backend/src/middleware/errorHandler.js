// Global Error Handler Middleware
function errorHandler(err, req, res, next) {
  console.error('❌ Server Error:', err.stack || err.message);

  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  res.status(statusCode).json({
    success: false,
    error: {
      message: err.message || 'Internal Server Error',
      status: statusCode,
      path: req.originalUrl,
      timestamp: new Date().toISOString()
    }
  });
}

// 404 Not Found Handler Middleware
function notFoundHandler(req, res, next) {
  res.status(404).json({
    success: false,
    error: {
      message: `Resource not found: ${req.originalUrl}`,
      status: 404,
      timestamp: new Date().toISOString()
    }
  });
}

module.exports = {
  errorHandler,
  notFoundHandler
};
