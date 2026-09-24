const express = require('express');
const router = express.Router();
const teamsController = require('../controllers/teamsController');

router.get('/', teamsController.getTeams);
router.get('/:id', teamsController.getTeamById);

module.exports = router;
