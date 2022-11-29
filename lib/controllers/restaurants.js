const { Router } = require('express');
// const authenticate = require('../middleware/authenticate');
// const authorize = require('../middleware/authorize');
const Restaurant = require('../models/Restaurant');

module.exports = Router().get('/', async (req, res, next) => {
  try {
    const restaurants = await Restaurant.getAll();
    res.json(restaurants);
  } catch (e) {
    next(e);
  }
});