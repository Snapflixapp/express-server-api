'use strict'

const db = require('../db')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')

exports.register = (username, password) => {
  return db.task(t => {
    return t.none('select * from users where username=$1', [username])
      .then(function () {
        const encryptedPassword = hashPassword(username, password)
        return t.one('insert into users(username, password) values($1, $2) returning id, username', [username, encryptedPassword])
      })
      .catch(() => {
        throw new Error('Username already taken.')
      })
  })
  .then(data => signToken(data))
}

exports.login = (username, password) => {
  return db.task(t => {
    return t.one('select * from users where username=$1', [username])
      .then(function (user) {
        const encryptedPassword = hashPassword(username, password)
        if (encryptedPassword !== user.password) {
          throw new Error('Invalid username or password')
        }
        return signToken(user)
      })
  })
  .then(data => data)
}

const hashPassword = (username, password) => {
  let s = username + ':' + password
  return crypto.createHash('sha256').update(s).digest('hex')
}

const signToken = (user) => {
  return jwt.sign({
    _id: user.id,
    username: user.username
  }, process.env.JWT_SECRET, { expiresIn: '1h' })
}
