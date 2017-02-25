'use strict'

const { get } = require('lodash')
const db = require('../db')
const { register, login } = require('./model')
const { writeResponse, writeError } = require('../utils')

exports.params = (req, res, next) => {
  let username = get(req.body, 'username')
  let password = get(req.body, 'password')

  if (!username || !password) {
    return writeError(res, {messages: 'Must provide a username and password'}, 400)
  }

  req.username = username
  req.password = password
  next()
}

exports.register = (req, res, next) => {
  register(db.getSession(req), req.username, req.password)
    .then(token => writeResponse(res, { token: token }, 201))
    .catch(next)
}

exports.login = (req, res, next) => {
  login(db.getSession(req), req.username, req.password)
    .then(token => writeResponse(res, { token: token }, 200))
    .catch(next)
}
