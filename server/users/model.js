'use strict'

// const { extend } = require('lodash')
const { get, isEmpty } = require('lodash')

exports.me = (session, id) => {
  return session.run('MATCH (user:User {id: {id}}) RETURN user', {id: id})
    .then(results => {
      if (isEmpty(results.records)) {
        throw new Error('User id does not exist')
      } else {
        return get(results.records[0].get('user'), 'properties')
      }
    })
}

// const User = (_node) => {
//   extend(this, {
//     id: _node.properties['id'],
//     username: _node.properties['username']
//   })
// }
//
// module.exports = User