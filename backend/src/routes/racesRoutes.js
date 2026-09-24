const express = require('express');
const router = express.Router();
const racesController = require('../controllers/racesController');

router.get('/', racesController.getRaces);
router.get('/:id', racesController.getRaceById);

module.exports = router;
