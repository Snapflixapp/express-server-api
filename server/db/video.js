'use strict'

const { extend } = require('lodash')

const Video = function (_node) {
  extend(this, {
    id: _node.properties['id'],
    processing: _node.properties['processing'],
    title: _node.properties['title']
  })
}

module.exports = Video
