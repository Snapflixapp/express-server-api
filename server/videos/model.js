'use strict'

const Video = require('../db/video')

// video = {
//   user_id: '123456789',
//   name: 'exampleVid',
//   videoUrl: 'www.amazon.com/s3/1234abc',
//   thumbnailUrl: 'www.amazon.com/s3/abc1234'
// }

exports.all = (session) => {
  return session.run('MATCH (video:Video) return video')
    .then(r => manyVideos(r))
}

const manyVideos = (videos) => {
  return videos.records.map(r => new Video(r.get('video')))
}
