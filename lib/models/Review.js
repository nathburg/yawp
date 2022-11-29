const pool = require('../utils/pool');

module.exports = class Review {
  id;
  userID;
  detail;

  constructor(row) {
    this.id = row.id;
    this.userID = row.user_id;
    this.detail = row.detail;
  }

  static async delete(id) {
    const { rows } = await pool.query(
      'DELETE FROM reviews WHERE id = $1 RETURNING *',
      [id]
    );
    if (!rows[0]) return null;
    return new Review(rows[0]);
  }
};
