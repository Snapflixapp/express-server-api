'use strict'

const { extend } = require('lodash')

const Video = (_node) => {
  extend(this, {
    id: _node.properties['id'],
    title: _node.properties['title'],
    videoUrl: _node.properties['videoUrl'],
    thumbnailUrl: _node.properties['thumbnailUrl']
  })
}

module.exports = Video
