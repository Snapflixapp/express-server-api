'use strict'

const _ = require('lodash')
const db = require('../db/')
// const router = require('express').Router()
const Users = require('./usersController')
const { writeResponse } = require('../helpers')

exports.register = (req, res, next) => {
  let username = _.get(req.body, 'username')
  let password = _.get(req.body, 'password')

  if (!username || !password) {
    res.status(400).send('You need a username and password')
    return
  }

  Users.register(db.getSession(req), username, password)
    .then((token) => {
      writeResponse(res, {token: token}, 201)
    })
    .catch(next)
}

exports.login = (req, res, next) => {
  var username = _.get(req.body, 'username')
  var password = _.get(req.body, 'password')

  if (!username || !password) {
    res.status(400).send('You need a username and password')
    return
  }

  Users.login(db.getSession(req), username, password)
    .then((token) => {
      writeResponse(res, {token: token}, 201)
    })
    .catch(next)
}

exports.me = (req, res, next) => {
  console.log('Req: ', req)
}
