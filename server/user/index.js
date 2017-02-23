'use strict'

const { get } = require('lodash')
const db = require('../db')
const controller = require('./controller')
const { writeResponse, writeError } = require('../utils')

exports.register = (req, res, next) => {
  let username = get(req.body, 'username')
  let password = get(req.body, 'password')

  if (!username || !password) {
    return writeError(res, {detail: 'Invalid username or password'}, 400)
  }

  controller.register(db.getSession(req), username, password)
    .then(token => writeResponse(res, {token: token}, 201))
    .catch(next)
}

exports.login = (req, res, next) => {
  var username = get(req.body, 'username')
  var password = get(req.body, 'password')

  if (!username || !password) {
    return writeError(res, {detail: 'Invalid username or password'}, 400)
  }

  controller.login(db.getSession(req), username, password)
    .then(token => writeResponse(res, {token: token}, 200))
    .catch(next)
}

exports.authenticate = (req, res, next) => {
  let user = req.user

  if (!user) {
    return writeError(res, {detail: req}, 400)
  }

  controller.me(db.getSession(req), user._id)
    .then((user) => {
      writeResponse(res, {
        user: {
          _id: user.id,
          username: user.username
        }
      }, 200)
    })
    .catch(next)
}
