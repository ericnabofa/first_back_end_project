const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data/index");
const request = require("supertest");
const app = require("../app/app");
const expectedEndpoints = require("../endpoints.json");

beforeAll(() => seed(data));
afterAll(() => db.end());

describe("GET /api/topics", () => {
  test("200: should respond with an array of all topic objects", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then(({ body }) => {
        const { topics } = body;
        expect(topics).toHaveLength(3);
        for (const topic of topics) {
          expect(topic).toMatchObject({
            slug: expect.any(String),
            description: expect.any(String),
          });
        }
      });
  });
});

describe("GET /api/articles", () => {
  test("200: responds with an array of all articles", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ body }) => {
        const { articles } = body;
        expect(articles).toHaveLength(13);
        for (const article of articles) {
          expect(article).toMatchObject({
            author: expect.any(String),
            title: expect.any(String),
            article_id: expect.any(Number),
            topic: expect.any(String),
            created_at: expect.any(String),
            votes: expect.any(Number),
            article_img_url: expect.any(String),
            comment_count: expect.any(String),
          });
        }
        expect(articles).toBeSortedBy("created_at", { descending: true });
      });
  });
});

describe("GET /api/articles/:article_id", () => {
  test("200: should respond with an article object gotten by its article_id", () => {
    return request(app)
      .get("/api/articles/1")
      .expect(200)
      .then(({ body }) => {
        const { article } = body;
        const actualCreatedAt = article.created_at;
        expect(article).toMatchObject({
          author: "butter_bridge",
          title: "Living in the shadow of a great man",
          article_id: 1,
          body: "I find this existence challenging",
          topic: "mitch",
          created_at: actualCreatedAt,
          votes: 100,
          article_img_url:
            "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
        });
      });
  });

  test("GET:404 sends an appropriate status and error message when given a valid but non-existent id", () => {
    return request(app)
      .get("/api/articles/100")
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("article does not exist");
      });
  });

  test("GET:400 sends an appropriate status and error message when given an invalid id", () => {
    return request(app)
      .get("/api/articles/not-an-article")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad Request");
      });
  });
});

describe("GET /api", () => {
  test("should respond with the content of endpoints.json", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then(({ body }) => {
        expect(body).toEqual(expectedEndpoints);
      });
  });
});

describe("GET /api/articles/:article_id/comments", () => {
  test("200: responds with an array of comments for the given article_id", () => {
    return request(app)
      .get(`/api/articles/1/comments`)
      .expect(200)
      .then(({ body }) => {
        const { comments } = body;
        expect(comments).toBeInstanceOf(Array);
        expect(comments.length).toBeGreaterThan(0);

        for (const comment of comments) {
          expect(comment).toMatchObject({
            comment_id: expect.any(Number),
            votes: expect.any(Number),
            created_at: expect.any(String),
            author: expect.any(String),
            body: expect.any(String),
            article_id: 1,
          });
        }
        expect(comments).toBeSortedBy("created_at", { descending: true });
      });
  });

  test("GET:404 sends an appropriate status and error message when given a valid but non-existent id", () => {
    return request(app)
      .get("/api/articles/100/comments")
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("article does not exist");
      });
  });

  test("GET:400 sends an appropriate status and error message when given an invalid id", () => {
    return request(app)
      .get("/api/articles/not-an-article/comments")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad Request");
      });
  });

  test("200: responds with an empty array when the article has no comments", () => {
    return request(app)
      .get("/api/articles/8/comments")
      .expect(200)
      .then(({ body }) => {
        const { comments } = body;
        expect(comments).toBeInstanceOf(Array);
        expect(comments).toHaveLength(0);
      });
  });
});

describe("POST /api/articles/:article_id/comments", () => {
  test("should respond with the posted comment object", () => {
    const comment = {
      username: "butter_bridge",
      body: "I am commenting for Eric!",
    };
    return request(app)
      .post("/api/articles/1/comments")
      .send(comment)
      .expect(201)
      .then(({ body }) => {
        const { comment } = body;
        expect(comment).toMatchObject({
          author: expect.any(String),
          body: expect.any(String),
          votes: expect.any(Number),
          article_id: 1,
          created_at: expect.any(String),
          comment_id: expect.any(Number),
        });
      });
  });
  test("POST:400 sends an appropriate status and error message when given a non-existent article_id", () => {
    const comment = {
      username: "butter_bridge",
      body: "I am commenting for Eric!",
    };
    return request(app)
      .post("/api/articles/nonExistenArticleId/comments")
      .send(comment)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad Request");
      });
  });
  test("POST:400 sends an appropriate status and error message when given an invalid comment", () => {
    const comment = {};
    return request(app)
      .post("/api/articles/1/comments")
      .send(comment)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad Request");
      });
  });

  test("POST:404 sends an appropriate status and error message when given a valid a non-existent article_id", () => {
    const comment = {
      username: "butter_bridge",
      body: "I am commenting for Eric!",
    };

    return request(app)
      .post("/api/articles/999/comments")
      .send(comment)
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("article does not exist");
      });
  });
});

describe("PATCH /api/articles/:article_id", () => {
  test("should update an article by article_id", () => {
    const existingArticle = {
      author: "butter_bridge",
      title: "Living in the shadow of a great man",
      article_id: 1,
      body: "I find this existence challenging",
      topic: "mitch",
      created_at: 1594329060000,
      votes: 100,
      article_img_url:
        "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
    };

    const newVote = { inc_votes: 8 };

    return request(app)
      .patch("/api/articles/1")
      .send(newVote)
      .expect(200)
      .then(({ body }) => {
        console.log(body, 'artcle to patch')
        const {updatedArticle} = body
        const actualCreatedAt = updatedArticle.created_at
        expect(updatedArticle).toMatchObject({
          author: "butter_bridge",
          title: "Living in the shadow of a great man",
          article_id: 1,
          body: "I find this existence challenging",
          topic: "mitch",
          created_at: actualCreatedAt,
          votes: existingArticle.votes + newVote.inc_votes,
          article_img_url:
            "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
        });
      });
  });

  test("PATCH: 400 sends an appropriate status and error message when given an invalid vote body", () => {
    return request(app)
      .patch('/api/articles/1')
      .send({})
      .expect(400)
      .then(({body}) => {
        expect(body.msg).toBe('Bad Request')
      });
  });

  test("PATCH: 400 sends an appropriate status and error message when given a non-existent article_id", () => {
    return request(app)
      .patch('/api/articles/not-an-articel_id')
      .send({ inc_votes: 5 })
      .expect(400)
      .then(({body}) => {
        expect(body.msg).toBe('Bad Request')
      });
    })

    test("PATCH: 400 sends an appropriate status and error message when given an invalid vote value", () => {
      const invalidVoteValue = { inc_votes: "word" };

      return request(app)
        .patch('/api/articles/1')
        .send(invalidVoteValue)
        .expect(400)
        .then(({body}) => {
          expect(body.msg).toBe('Bad Request')
        });
    });
    
    test("PATCH: 404 sends an appropriate status and error message when given a valid but non-existent id", () => {
      return request(app)
        .patch("/api/articles/99")
        .send({ inc_votes: 5 })
        .expect(404)
        .then(({body}) => {
          expect(body.msg).toBe('article does not exist')
        });
    });
  });
