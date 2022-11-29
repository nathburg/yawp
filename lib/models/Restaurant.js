const pool = require('../utils/pool');

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
        const {rows} = await pool.query('SELECT * FROM restaurants');
        return rows.map(row => new Restaurant(row));
    }
}