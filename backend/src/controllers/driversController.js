const dbService = require('../services/dbService');

async function getDrivers(req, res, next) {
  try {
    const drivers = await dbService.getDrivers();
    res.status(200).json({
      success: true,
      count: drivers.length,
      data: drivers
    });
  } catch (err) {
    next(err);
  }
}

async function getDriverById(req, res, next) {
  try {
    const driver = await dbService.getDriverById(req.params.id);
    if (!driver) {
      return res.status(404).json({
        success: false,
        error: { message: `Driver not found with ID: ${req.params.id}` }
      });
    }
    res.status(200).json({
      success: true,
      data: driver
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getDrivers,
  getDriverById
};
