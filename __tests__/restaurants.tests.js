const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const UserService = require('../lib/services/UserService');

const mockUser = {
  firstName: 'Test',
  lastName: 'User',
  email: 'test@example.com',
  password: '12345',
};

const registerAndLogin = async (userProps = {}) => {
  const password = userProps.password ?? mockUser.password;
  const agent = request.agent(app);
  const user = await UserService.create({ ...mockUser, ...userProps });
  const { email } = user;
  await agent.post('/api/v1/users/sessions').send({ email, password });
  return [agent, user];
};

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

  test('GET /api/v1/restaurants/:id returns detail of restaurant with nested list of reviews', async () => {
    const res = await request(app).get('/api/v1/restaurants/1');
    expect(res.body).toMatchInlineSnapshot(`
      Object {
        "id": "1",
        "name": "McDonalds",
        "reviews": Array [
          Object {
            "detail": "Extraordinary diarrhea",
            "id": "1",
            "userID": "1",
          },
        ],
      }
    `);
  });

  test('POST /api/v1/restaurants/:id/reviews adds new review for restaurant and is protected by authentication', async () => {
    const [agent, user] = await registerAndLogin();
    const res1 = request(app)
      .post('/api/v1/restaurants/2/reviews')
      .send({ userID: user.id, detail: 'Manageable diarrhea' });
    expect(res1.body).toMatchInlineSnapshot(`undefined`);

    const res2 = await agent
      .post('/api/v1/restaurants/2/reviews')
      .send({ userID: user.id, detail: 'Manageable diarrhea' });
    expect(res2.body).toMatchInlineSnapshot(`
      Object {
        "detail": "Manageable diarrhea",
        "id": "2",
        "userID": "2",
      }
    `);
  });
  test('DELETE /api/v1/reviews/:id deletes reviews if admin or user who posted review', async () => {
    const mockAdmin = {
      firstName: 'admin',
      lastName: 'admin',
      email: 'admin',
      password: '12345',
    };
    const [agentAdmin, userAdmin] = await registerAndLogin(mockAdmin);

    const agent = request.agent(app);
    await agent.post('/api/v1/users/sessions').send({
      email: 'fakeemail@example.com',
      password: 'password',
    });
    const res = await agent.delete('/api/v1/reviews/1');
    expect(res.body).toMatchInlineSnapshot(`
        Object {
          "message": "Review deleted",
          "success": true,
        }
      `);
  });
});
