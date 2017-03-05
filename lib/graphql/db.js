import db from '../db'
import config from '../config'
import Promise from 'bluebird'

const c = config.get()
const S3 = new Promise.promisifyAll(new c.AWS.S3())

const inputBucket = 'snapflix-videos-raw'
const ACL = 'public-read'

exports.getVideos = () => {
  return db.many('select * from videos')
    .then(data => data)
    .catch(error => error)
}

exports.getVideosByUserId = (userId) => {
  return db.many('select * from videos where user_id=$1', userId)
    .then(data => data)
    .catch(error => error)
}

exports.getVideoByVideoId = (videoId) => {
  return db.one('select * from videos where id=$1', videoId)
    .then(data => data)
    .catch(error => error)
}

exports.getUsers = () => {
  return db.many('select * from users')
    .then(data => data)
    .catch(error => error)
}

exports.getCommentsByVideoId = (videoId) => {
  return db.many('select * from comments where video_id=$1', videoId)
    .then(data => data)
    .catch(error => error)
}

exports.getCommentsByUserId = (userId) => {
  return db.many('select * from comments where user_id=$1', userId)
    .then(data => data)
    .catch(error => error)
}

exports.getUserByUserId = (userId) => {
  return db.one('select * from users where id=$1', [userId])
    .then(data => data)
    .catch(error => error)
}

exports.createComment = (content, userId, videoId) => {
  return db.one('insert into comments(content, user_id, video_id) values($1, $2, $3) returning *', [content, userId, videoId])
    .then(data => data)
    .catch(error => error)
}

exports.createVideo = (title, id, {user}) => {
  console.log('ID: ', id || user._id)
  return db.one('insert into videos(title, user_id) values($1, $2) returning *', [title, id || user._id])
    .then(video => video)
    .catch(error => error)
}

exports.getSignedUrl = (video, {user}) => {
  console.log('Video: ', video)
  console.log('User: ', user)
  const contentType = 'video/webm'
  const ext = findType(contentType)
  const filekey = `${user.username}/${video.id}.${ext}`

  return S3.getSignedUrlAsync('putObject', {
    Bucket: inputBucket,
    Key: filekey,
    ContentType: contentType,
    ACL: ACL
  })
  .then(data => data)
  .catch(error => error)
}

const findType = (string) => {
  let n = string.lastIndexOf('/')
  return string.substring(n + 1)
}
