const db = require('../db/connection')
const seed = require('../db/seeds/seed')
const data = require('../db/data/test-data/index')
const request = require('supertest')
const app = require('../app/app')
const expectedEndpoints = require('../endpoints.json');

beforeAll(() => seed(data));
afterAll(() => db.end());

describe('GET /api/topics', () => {
    test('200: should respond with an array of all topic objects', () => {
        return request(app)
        .get('/api/topics')
        .expect(200)
        .then(({ body}) => {
            const  { topics} = body;
            expect(topics).toHaveLength(3)
            for (const topic of topics) {
                expect(topic).toMatchObject({
                    slug: expect.any(String),
                    description: expect.any(String)
                });
            }
        })
    });
});


describe('GET /api', () => {
    test('should respond with the content of endpoints.json', () => {
      return request(app)
        .get('/api')
        .expect(200)
        .then(({ body }) => {
          expect(body).toEqual(expectedEndpoints);
        });
    });
  });
  