const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');
const Restaurant = require('../models/Restaurant');

module.exports = Router()
  .get('/', async (req, res, next) => {
    try {
      const restaurants = await Restaurant.getAll();
      res.json(restaurants);
    } catch (e) {
      next(e);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const restaurant = await Restaurant.getByID(req.params.id);
      await restaurant.addReviews();
      res.json(restaurant);
    } catch (e) {
      next(e);
    }
  })
  .post('/:id/reviews', [authenticate], async (req, res, next) => {
    try {
      const review = await Restaurant.insertReview({
        restaurantID: req.params.id,
        ...req.body,
      });
      res.json(review);
    } catch (e) {
      next(e);
    }
  });
