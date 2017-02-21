'use strict'

const _ = require('lodash')

const User = (_node) => {
  _.extend(this, {
    id: _node.properties['id'],
    username: _node.properties['username']
  })
}

module.exports = User
