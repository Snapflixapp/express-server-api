'use strict'

const _ = require('lodash')
const db = require('../db')
const Users = require('../models/users')
const writeResponse = require('../helpers').writeResponse
const writeError = require('../helpers').writeError

exports.register = (req, res, next) => {
  let username = _.get(req.body, 'username')
  let password = _.get(req.body, 'password')

  if (!username || !password) {
    return writeError(res, {detail: 'Invalid username or password'}, 400)
  }

  Users.register(db.getSession(req), username, password)
    .then(token => writeResponse(res, {token: token}, 201))
    .catch(next)
}

exports.login = (req, res, next) => {
  var username = _.get(req.body, 'username')
  var password = _.get(req.body, 'password')

  if (!username || !password) {
    return writeError(res, {detail: 'Invalid username or password'}, 400)
  }

  Users.login(db.getSession(req), username, password)
    .then(token => writeResponse(res, {token: token}, 200))
    .catch(next)
}

exports.authenticate = (req, res, next) => {
  let user = req.user

  if (!user) {
    return writeError(res, {detail: req}, 400)
  }

  Users.me(db.getSession(req), user._id)
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
