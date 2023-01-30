// const request = require('supertest');
// const mongoose = require('mongoose');
// require('dotenv/config');

// const app = require('../app');


// describe('API endpoint testing', () => {
//   let connection;
//   let db;

//   beforeAll(async () => {
//     connection = await MongoClient.connect(process.env.DB_CONNECTION, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     db = connection.db();
//   });

//   afterAll(async () => {
//     await connection.close();
//   });

//   it('Should retrieve data from MongoDB and return it', async () => {
//     const usersCollection = db.collection('users');
//     const testData = { name: 'John Doe', email: 'd.gasana@hello.com', password: '1234567' };
//     await usersCollection.insertOne(testData);

//     const response = await request(app).get('/api/users');
//     const data = response.body;
//     expect(data).toEqual([testData]);
//   });
// });
