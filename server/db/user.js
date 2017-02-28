'use strict'

const { extend } = require('lodash')

const User = function (_node) {
  extend(this, {
    id: _node.properties['id'],
    username: _node.properties['username']
  })
}

module.exports = User
