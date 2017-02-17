/* global describe, it */

var app = require('../server')
var chai = require('chai')
var request = require('supertest')

var expect = chai.expect

describe('API Tests', function () {
  it('should say hello', function (done) {
    request(app)
      .get('/')
      .end(function (err, res) {
        if (err) throw err
        expect(res).to.be.text
        expect(res.statusCode).to.equal(200)
        done()
      })
  })
})
