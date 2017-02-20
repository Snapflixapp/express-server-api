'use strict'

const db = require('../db')
const _ = require('lodash')

const getUser = (session, token) => {
  return session
    .run('MATCH (user:USER {api_key: {token}}) RETURN user', {token: token})
    .then(results => {
      if (_.isEmpty(results.records)) {
        throw {message: 'invalid authorization key', status: 401}
      }
      return new User(results.records[0].get('user'))
    })
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
