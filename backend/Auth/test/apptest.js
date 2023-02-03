const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose')
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

describe("TESTING LANDING page", () => {
    it("Should display We are on home", (done) => {
        chai.request('app')
        .get('/')
        .end((err,res) => {
            res.should.have.status(200);
            res.should.be.a('string');
            done();
        });
    });
});
