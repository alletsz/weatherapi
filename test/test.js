const supertest = require('supertest');
const app = require('../app.js'); //reference app file
const expect = require('chai').expect

describe('test should test root route to app', () => {
  it('should respond with status 200', (done) => {
    supertest('http://localhost:7002') //or use 'app'
      .get('/')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        expect(res.status).equal(200);
        done();
      })
  });

});

describe('GET /path', () => {
  it('should throw an error due to invalid endpoint', (done) => {
    supertest('http://localhost:7002')
      .get('/random')
      .expect('Content-Type', /html/)
      .expect(404, done)
      .end((err, res) => {
        expect(res.status).equal(404);
        done();
      })
  })
});
