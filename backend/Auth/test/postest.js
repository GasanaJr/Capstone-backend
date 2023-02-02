// const request = require('supertest');
// const app = require('../app');
// const mongoose = require('mongoose')
// const chai = require('chai');
// const chaiHttp = require('chai-http');
// const should = chai.should();

// chai.use(chaiHttp);

// describe("CRUD Test", () => {
//     // Try Catch block
//      beforeEach(async () => {
//          await mongoose.connect(process.env.DB_CONNECTION).then(()=> {
//              console.log('Connected to DB');
//             }).catch((err)=> {
//                 console.log(err);
//             }); 
//      });
//     describe("OPERATIONS ON POSTS", ()=> {
//         it("Should return all the saved POSTS on GET /post", (done) => {
//             chai.request(app)
//             .get('/posts')
//             .end((err,res) => {
//                 if(err) done(err);
//                 else {
//                     res.should.have.status(200);
//                     res.should.be.json;
//                     res.body.should.be.a("array");
//                     res.body[0].should.have.property("title");
//                     res.body[0].should.have.property("description");
//                     res.body[0].should.have.property("_id");
//           done();

//                 }
//             });
//         });
//         it("Should return a SPECIFIC POST on POST /posts/id", (done) => {
//             chai.request(app)
//             .post('/api/user/login')
//             .send({
//                 email: "d.gasana@alustudent.com",
//                 password: "whynotme"
//             })
//             .end((err,res) => {
//                 const token  = res.body.token;
//                 chai.request(app)
//                 .get('/posts')
//                 .end((err,res) => {
//                 chai.request(app)
//                 .get('/posts/' + res.body[0]._id)
//                 .set('auth-token', token)
//                 .end((error, response) => {
//                     if(error) done(error);
//                 else {
//                     response.should.have.status(200);
//                     response.should.be.json;
//                     response.body.should.be.a("object");
//                     response.body.should.have.property("title");
//                     response.body.should.have.property("description");
//                     response.body.should.have.property("_id");
//                     done();
//                 }
//                 }) 
//             })
//             });
//         });
//         it("Should create a NEW POST on POST /posts", (done) => {
//             chai.request(app)
//             .post('/api/user/login')
//             .send({
//                 email: "d.gasana@alustudent.com",
//                 password: "whynotme"
//             }).end((err,res) => {
//                 chai.request(app)
//                 .post('/posts')
//                 .send({
//                     title: "First Mocha Test",
//                     description: "Please work"
//                 })
//                 .set('auth-token', `${res.body.token}`)
//                 .end((error, response) => {
//                     response.should.have.status(200);
//                     response.body.should.have.property("title");
//                     response.body.should.have.property("description");
//                     response.body.should.have.property("_id");
//                     done();
//                 });
//             });
//         });

//         it("Should UPDATE A POST on PATCH /posts/id", (done) => {
//             chai.request(app)
//             .post('/api/user/login')
//             .send({
//                 email: "d.gasana@alustudent.com",
//                 password: "whynotme"
//             }).end((err,res) => {
//                 if(err) done(err);
//                 else {
//                     const token = res.body.token;
//                     chai.request(app)
//                     .get('/posts')
//                     .end((err,res) => {
//                         chai.request(app)
//                         .patch('/posts/' + res.body[0]._id)
//                         .send({
//                             title: "Updating using Mocha"
//                         })
//                         .set('auth-token', token)
//                         .end((error, response) => {
//                             response.should.have.status(200);
//                            // response.body.should.have.property("title");
//                            // response.body.should.have.property("description");
//                            // response.body.should.have.property("_id");
//                             done();
//                         });
//                     });
//                 }
//             });
//         });



//         it("Should DELETE A POST on DELETE /posts/id", (done) => {
//             chai.request(app)
//             .post('/api/user/login')
//             .send({
//                 email: "d.gasana@alustudent.com",
//                 password: "whynotme"
//             }).end((err,res) => {
//                 if(err) done(err);
//                 else {
//                     const token = res.body.token;
//                     chai.request(app)
//                     .get('/posts')
//                     .end((err,res) => {
//                         chai.request(app)
//                         .delete('/posts/' + res.body[0]._id)
//                         .set('auth-token', token)
//                         .end((error, response) => {
//                             response.should.have.status(200);
//                            // response.body.should.have.property("title");
//                            // response.body.should.have.property("description");
//                            // response.body.should.have.property("_id");
//                             done();
//                         });
//                     });
//                 }
//             });
//         });
//  });
// });



