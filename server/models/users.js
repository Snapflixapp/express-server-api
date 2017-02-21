'use strict'

const _ = require('lodash')
const uuid = require('uuid')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')

exports.register = (session, username, password) => {
  return session.run('MATCH (user:User {username: {username}}) RETURN user', {username: username})
    .then(results => {
      if (!_.isEmpty(results.records)) {
        throw new Error({username: 'Username already in use', status: 400})
      } else {
        return session.run('CREATE (user:User {id: {id}, username: {username}, password: {password}}) RETURN user',
          {
            id: uuid.v4(),
            username: username,
            password: hashPassword(username, password)
          }
        ).then((results) => {
          const dbUser = _.get(results.records[0].get('user'), 'properties')
          return signToken(dbUser)
        })
      }
    })
}

exports.login = function (session, username, password) {
  return session.run('MATCH (user:User {username: {username}}) RETURN user', {username: username})
    .then(results => {
      if (_.isEmpty(results.records)) {
        throw new Error({username: 'Username does not exist', status: 400})
      } else {
        const dbUser = _.get(results.records[0].get('user'), 'properties')
        if (dbUser.password !== hashPassword(username, password)) {
          throw new Error({password: 'Password is incorrect', status: 400})
        }
        return signToken(dbUser)
      }
    }
  )
}

const hashPassword = (username, password) => {
  let s = username + ':' + password
  return crypto.createHash('sha256').update(s).digest('hex')
}

// util method to sign tokens on register and login
const signToken = (user) => {
  return jwt.sign(
    {
      _id: user.id,
      _name: user.username
    },
    process.env.JWT_SECRET,
    {expiresIn: '1h'}
  )
}
