const dbService = require('../services/dbService');

async function getCars(req, res, next) {
  try {
    const cars = await dbService.getCars();
    res.status(200).json({
      success: true,
      count: cars.length,
      data: cars
    });
  } catch (err) {
    next(err);
  }
}

async function getCarById(req, res, next) {
  try {
    const car = await dbService.getCarById(req.params.id);
    if (!car) {
      return res.status(404).json({
        success: false,
        error: { message: `Car not found with ID: ${req.params.id}` }
      });
    }
    res.status(200).json({
      success: true,
      data: car
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getCars,
  getCarById
};
