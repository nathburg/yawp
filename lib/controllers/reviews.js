const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');
const authorizeDelete = require('../middleware/authorizeDelete');
const Review = require('../models/Review');

module.exports = Router().delete(
  '/:id',
  [authenticate, authorizeDelete],
  async (req, res, next) => {
    try {
      const data = await Review.delete(req.params.id);
      if (!data) next();
      res.json({ success: true, message: 'Review deleted' });
    } catch (e) {
      next(e);
    }
  }
);
