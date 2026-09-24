const express = require('express');
const router = express.Router();
const driversController = require('../controllers/driversController');

router.get('/', driversController.getDrivers);
router.get('/:id', driversController.getDriverById);

module.exports = router;
