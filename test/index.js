/* global describe, it */

var app = require('../server')
var chai = require('chai')
var request = require('supertest')

var expect = chai.expect

describe('Login', function () {
  it('should create session for valid user', function (done) {
    request(app)
      .post('/login')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send({ username: 'username', password: 'password' })
      .expect(200)
      .expect('Content-Type', /json/)
      .expect(function (response) {
        expect(response.body).not.to.be.empty
        expect(response.body).to.be.an('object')
      })
      .end(done)
  })
})
