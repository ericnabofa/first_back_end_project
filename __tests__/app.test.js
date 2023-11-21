const db = require('../db/connection')
const seed = require('../db/seeds/seed')
const data = require('../db/data/test-data/index')
const request = require('supertest')
const app = require('../app/app')

beforeAll(() => seed(data));
afterAll(() => db.end());

describe('GET /api/topics', () => {
    test('200: should respond with an array of all topic objects', () => {
        return request(app)
        .get('/api/topics')
        .expect(200)
        .then(({ body}) => {
            const  { topics} = body;
            for (const topic of topics) {
                expect(topic).toMatchObject({
                    slug: expect.any(String),
                    description: expect.any(String)
                });
            }
        })
    });
});

