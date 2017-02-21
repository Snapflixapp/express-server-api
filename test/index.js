/* global describe, it, afterEach */
'use strict'

const app = require('../server')
const chai = require('chai')
const request = require('supertest')
const session = require('../server/db').getSession(request)

const expect = chai.expect

describe('Register user', function () {
  it('should create session for valid user', function (done) {
    request(app)
      .post('/register')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send({ username: 'username', password: 'password' })
      .expect(201)
      .expect('Content-Type', /json/)
      .expect(function (response) {
        expect(response.body).not.to.be.empty
        expect(response.body).to.be.an('object')
      })
      .end(done)
  })
})

describe('Log in user', function () {
  afterEach(function () {
    session.run('MATCH (user:User {username: {username}}) DELETE user', {username: 'username'})
  })

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
