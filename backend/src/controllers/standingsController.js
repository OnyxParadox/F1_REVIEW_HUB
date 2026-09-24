const dbService = require('../services/dbService');

async function getDriverStandings(req, res, next) {
  try {
    const standings = await dbService.getDriverStandings();
    res.status(200).json({
      success: true,
      count: standings.length,
      data: standings
    });
  } catch (err) {
    next(err);
  }
}

async function getConstructorStandings(req, res, next) {
  try {
    const standings = await dbService.getConstructorStandings();
    res.status(200).json({
      success: true,
      count: standings.length,
      data: standings
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getDriverStandings,
  getConstructorStandings
};
