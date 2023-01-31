const app = require('../app');
const request = require('supertest');
const { describe } = require('@hapi/joi/lib/base');

describe("Operations on Posts", () => {
     describe("Create", () => {
        it("Should return 200 if Creation is successful", async () => {
            const post = {
                title: "First Test",
                description: "TDD post"
            };
            const res = await request(app).post('/posts').send(post);
            expect(res.status).toBe(200);
        })
     })
});