const dbService = require('../services/dbService');

async function getRaces(req, res, next) {
  try {
    const races = await dbService.getRaces();
    res.status(200).json({
      success: true,
      count: races.length,
      data: races
    });
  } catch (err) {
    next(err);
  }
}

async function getRaceById(req, res, next) {
  try {
    const race = await dbService.getRaceById(req.params.id);
    if (!race) {
      return res.status(404).json({
        success: false,
        error: { message: `Race not found with ID: ${req.params.id}` }
      });
    }
    res.status(200).json({
      success: true,
      data: race
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getRaces,
  getRaceById
};
