const app = require('../app');
const request = require('supertest');

describe("Welcome Page", () => {
    it("Should return 200 if page found", async () => {
        const res = await request(app).get("/");
        expect(res.status).toBe(200);
        // expect(res.body).toHave("We are on home");
    })
})