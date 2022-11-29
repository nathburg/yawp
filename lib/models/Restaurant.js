const pool = require('../utils/pool');
const Review = require('./Review');

module.exports = class Restaurant {
  id;
  name;
  reviews;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.reviews = row.reviews;
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM restaurants');
    return rows.map((row) => new Restaurant(row));
  }

  static async getByID(id) {
    const { rows } = await pool.query(
      'SELECT * FROM restaurants WHERE id = $1',
      [id]
    );
    if (!rows) return null;
    return new Restaurant(rows[0]);
  }

  async addReviews() {
    const { rows } = await pool.query(
      'Select * FROM reviews WHERE restaurant_id = $1',
      [this.id]
    );
    this.reviews = rows.map((row) => new Review(row));
  }

  static async insertReview({ restaurantID, userID, detail }) {
    const { rows } = await pool.query(
      `INSERT INTO reviews (restaurant_id, user_id, detail)
        VALUES ($1, $2, $3)
        RETURNING *`,
      [restaurantID, userID, detail]
    );
    return new Review(rows[0]);
  }
};
