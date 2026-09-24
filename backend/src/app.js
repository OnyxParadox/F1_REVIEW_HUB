const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const requestLogger = require('./middleware/logger');
const { errorHandler, notFoundHandler } = require('./middleware/errorHandler');

// Import Route Modules
const healthRoutes = require('./routes/healthRoutes');
const teamsRoutes = require('./routes/teamsRoutes');
const driversRoutes = require('./routes/driversRoutes');
const carsRoutes = require('./routes/carsRoutes');
const racesRoutes = require('./routes/racesRoutes');
const standingsRoutes = require('./routes/standingsRoutes');
const reviewsRoutes = require('./routes/reviewsRoutes');

const app = express();

// Middleware
app.use(helmet());
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);

// API Root Information
app.get('/api', (req, res) => {
  res.status(200).json({
    name: 'F1 Review Hub API',
    version: '1.0.0',
    description: 'DevOps Docker & AWS EC2 Capstone REST API',
    endpoints: {
      health: '/api/health',
      teams: '/api/teams',
      drivers: '/api/drivers',
      cars: '/api/cars',
      races: '/api/races',
      driver_standings: '/api/standings/drivers',
      constructor_standings: '/api/standings/constructors',
      reviews: '/api/reviews'
    }
  });
});

// Mount Routes
app.use('/api/health', healthRoutes);
app.use('/api/teams', teamsRoutes);
app.use('/api/drivers', driversRoutes);
app.use('/api/cars', carsRoutes);
app.use('/api/races', racesRoutes);
app.use('/api/standings', standingsRoutes);
app.use('/api/reviews', reviewsRoutes);

// Fallback Handlers
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
