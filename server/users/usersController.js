'use strict'

const _ = require('lodash')
const uuid = require('node-uuid')
const crypto = require('crypto')
const User = require('./usersModel')
const signToken = require('../auth').signToken

exports.register = (session, username, password) => {
  return session.run('MATCH (user:User {username: {username}}) RETURN user', {username: username})
    .then(results => {
      if (!_.isEmpty(results.records)) {
        // throw {username: 'username already in use', status: 400}
        console.log('Username already exists!')
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
        // throw {username: 'username does not exist', status: 400}
        console.log('Username is incorrect!')
        return
      } else {
        const dbUser = _.get(results.records[0].get('user'), 'properties')
        if (dbUser.password !== hashPassword(username, password)) {
          // throw {password: 'wrong password', status: 400}
          console.log('Password is incorrect!')
          return
        }
        return signToken(dbUser)
      }
    }
  )
}

// exports.get = (session, token) => {
//   return session
//     .run('MATCH (user:USER {api_key: {token}}) RETURN user', {token: token})
//     .then(results => {
//       if (_.isEmpty(results.records)) {
//         // throw {message: 'invalid authorization key', status: 401}
//         console.log('No user matches that token')
//       }
//       return new User(results.records[0].get('user'))
//     })
// }

const hashPassword = (username, password) => {
  let s = username + ':' + password
  return crypto.createHash('sha256').update(s).digest('hex')
}

// db.session
//   .run('MATCH (n:Person) RETURN n LIMIT 25')
//   .then(function (result) {
//     var usersArr = []
//     result.records.forEach(function (record) {
//       usersArr.push({
//         id: record._fields[0].identity.low,
//         name: record._fields[0].properties.name
//       })
//       console.log(record._fields[0].properties)
//     })
//     res.status(200)
//     res.send({users: usersArr})
//   })
//   .catch(function (err) {
//     console.log('ERROR!!!!!!')
//     console.log(err)
//   })
