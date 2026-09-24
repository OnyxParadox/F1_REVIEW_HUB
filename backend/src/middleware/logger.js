const morgan = require('morgan');

// Custom morgan logging format for clean structured server logs
const requestLogger = morgan((tokens, req, res) => {
  return [
    `[HTTP]`,
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens['response-time'](req, res), 'ms',
    '- IP:', tokens['remote-addr'](req, res)
  ].join(' ');
});

module.exports = requestLogger;
