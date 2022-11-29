const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('user routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  afterAll(() => {
    pool.end();
  });

  test('GET /api/v1/restaurants shows list of restaurants', async () => {
    const res = await request(app).get('/api/v1/restaurants');
    expect(res.body).toMatchInlineSnapshot(`
      Array [
        Object {
          "id": "1",
          "name": "McDonalds",
        },
        Object {
          "id": "2",
          "name": "Burger King",
        },
      ]
    `);
  });

  test.skip('GET /api/v1/restaurants/:id returns detail of restaurant with nested list of reviews', () => {});

  test.skip('POST /api/v1/restaurants/id/reviews adds new review for restaurant and is protected by authentication', () => {});

  test.skip('DELETE /api/v1/reviews/:id deletes reviews if admin or user who posted review', () => {});
});
