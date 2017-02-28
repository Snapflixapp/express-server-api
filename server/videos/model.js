'use strict'

const Video = require('../db/video')

exports.all = (session) => {
  return session.run('MATCH (video: Video) return video')
    .then(r => manyVideos(r))
}

const manyVideos = (videos) => {
  return videos.records.map(r => new Video(r.get('video')))
}
