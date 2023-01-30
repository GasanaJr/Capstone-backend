 const app = require('../app');
 const request = require('supertest');
 const mongoose = require('mongoose');
 require('dotenv/config');
//  const { describe } = require('@hapi/joi/lib/base');

 describe("Operations on Posts", () => {
  let connection;
  beforeAll(async () => {
   connection = await mongoose.connect(process.env.DB_CONNECTION).then(()=> {
      console.log('Connected to DB');
     }).catch((err)=> {
         console.log(err);
     }); 
  });
      describe("Create", () => {
         it("Should return 200 if Creation is successful", async () => {
             const post = {
                 title: "First Test",
                 description: "TDD post"
             };
             const res = await request(app).post('/posts').send(post);
             expect(res.status).toBe(200);
         })
      });
      describe('GET /posts', () => {
        it('should return an array of posts', async () => {
          const response = await request(app).get('/posts');
          expect(response.status).toBe(200);
          expect(Array.isArray(response.body)).toBe(true);
        });
      
        it('should return a JSON object with a message property if an error occurs', async () => {
          const Post = { find: jest.fn().mockRejectedValue(new Error('Test error')) };
          const response = await request(app).get('/posts');
          expect(response.status).toBe(500);
          expect(response.body).toHaveProperty('message');
          expect(response.body.message).toBe('Test error');
        });
      });
      
 });

// const request = require('supertest');
// const app = require('../app');

