const dbService = require('../services/dbService');

async function getTeams(req, res, next) {
  try {
    const teams = await dbService.getTeams();
    res.status(200).json({
      success: true,
      count: teams.length,
      data: teams
    });
  } catch (err) {
    next(err);
  }
}

async function getTeamById(req, res, next) {
  try {
    const team = await dbService.getTeamById(req.params.id);
    if (!team) {
      return res.status(404).json({
        success: false,
        error: { message: `Team not found with ID: ${req.params.id}` }
      });
    }
    res.status(200).json({
      success: true,
      data: team
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getTeams,
  getTeamById
};
