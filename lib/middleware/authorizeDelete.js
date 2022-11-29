const Review = require('../models/Review');

module.exports = async (req, res, next) => {
  const review = await Review.getByID(req.params.id);
  try {
    if (
      req.user &&
      (req.user.email === 'admin' || req.user.id === review.userID)
    ) {
      next();
    } else {
      throw new Error('You do not have access to view this page');
    }
  } catch (err) {
    err.status = 403;
    next(err);
  }
};
