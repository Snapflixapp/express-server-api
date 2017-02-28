'use strict'

const { isEmpty } = require('lodash')
const User = require('../db/user')

exports.me = (session, id) => {
  return session.run('MATCH (user:User {id: {id}}) RETURN user', {id: id})
    .then(results => {
      if (isEmpty(results.records)) {
        throw new Error('User id does not exist')
      } else {
        return new User(results.records[0].get('user'))
      }
    })
}
