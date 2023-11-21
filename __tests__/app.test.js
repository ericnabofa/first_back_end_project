const db = require('../db/connection')
const seed = require('../db/seeds/seed')
const data = require('../db/data/test-data/index')
const request = require('supertest')
const app = require('../app/app')
const endpoints = require('../endpoints.json')

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
    test('should respond with an object describing all the available endpoints on your API', () => {
        return request(app)
        .get('/api')
        .expect(200)
        .then(({body}) => {
            const endpointsList = body
            expect(typeof endpointsList).toBe('object')
            Object.entries(endpoints).forEach(([endpoint, data]) => {
                expect(endpointsList[endpoint]).toBeDefined();
                expect(endpointsList[endpoint].description).toEqual(data.description);
                expect(endpointsList[endpoint].queries).toEqual(data.queries);
                expect(endpointsList[endpoint].exampleResponse).toEqual(data.exampleResponse);
            })
        })
    });
});