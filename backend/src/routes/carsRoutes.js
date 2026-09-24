const express = require('express');
const router = express.Router();
const carsController = require('../controllers/carsController');

router.get('/', carsController.getCars);
router.get('/:id', carsController.getCarById);

module.exports = router;
