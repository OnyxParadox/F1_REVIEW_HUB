const dbService = require('../services/dbService');

async function getReviews(req, res, next) {
  try {
    const { category } = req.query;
    const reviews = await dbService.getReviews(category);
    res.status(200).json({
      success: true,
      count: reviews.length,
      data: reviews
    });
  } catch (err) {
    next(err);
  }
}

async function getReviewById(req, res, next) {
  try {
    const review = await dbService.getReviewById(req.params.id);
    if (!review) {
      return res.status(404).json({
        success: false,
        error: { message: `Review not found with ID: ${req.params.id}` }
      });
    }
    res.status(200).json({
      success: true,
      data: review
    });
  } catch (err) {
    next(err);
  }
}

async function createReview(req, res, next) {
  try {
    const { category, subject_id, title, author, rating, review_text } = req.body;

    if (!category || !subject_id || !title || !review_text) {
      return res.status(400).json({
        success: false,
        error: { message: 'Missing required review fields: category, subject_id, title, review_text' }
      });
    }

    const review = await dbService.createReview({
      category,
      subject_id,
      title,
      author: author || 'F1 Enthusiast',
      rating: rating || 5,
      review_text
    });

    res.status(201).json({
      success: true,
      data: review
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getReviews,
  getReviewById,
  createReview
};
