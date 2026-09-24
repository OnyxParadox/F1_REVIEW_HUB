const express = require('express');
const router = express.Router();
const standingsController = require('../controllers/standingsController');

router.get('/drivers', standingsController.getDriverStandings);
router.get('/constructors', standingsController.getConstructorStandings);

module.exports = router;
