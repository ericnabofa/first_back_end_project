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

describe('GET /api/articles/:article_id', () => {
    test('200: should respond with an article object gotten by its article_id', () => {
        return request(app)
        .get('/api/articles/1')
        .expect(200)
        .then(({body}) => {
            const actualCreatedAt = body.article.created_at;
            expect(body.article).toMatchObject({
                author: 'butter_bridge',
                title: 'Living in the shadow of a great man',
                article_id: 1,
                body: 'I find this existence challenging',
                topic: 'mitch',
                created_at: actualCreatedAt,
                votes: 100,
                article_img_url:
                "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
            })
        })
    });

    test('GET:404 sends an appropriate status and error message when given a valid but non-existent id', () => {
        return request(app)
          .get('/api/articles/100')
          .expect(404)
          .then((response) => {
            expect(response.body.msg).toBe('article does not exist');
          });
      });

    test('GET:400 sends an appropriate status and error message when given an invalid id', () => {
        return request(app)
        .get('/api/articles/not-an-article')
        .expect(400)
        .then(({body}) => {
            expect(body.msg).toBe('Bad Request')
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
  
