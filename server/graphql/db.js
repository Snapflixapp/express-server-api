const db = require('../db')
const uuid = require('uuid')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')

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

exports.createVideo = (title, userId) => {
  return db.one('insert into videos(title, user_id) values($1, $2) returning *', [title, userId])
    .then(data => data)
    .catch(error => error)
}

exports.createUser = (username, password) => {
  return db.one('insert into users(username, password) values($1, $2) returning id, username', [username, password])
    .then(data => {
      return data
    })
    .catch(error => error)
}

const hashPassword = (username, password) => {
  let s = username + ':' + password
  return crypto.createHash('sha256').update(s).digest('hex')
}

const signToken = (user) => {
  return jwt.sign({
    id: user.id,
    username: user.username
  }, process.env.JWT_SECRET, { expiresIn: '1h' })
}
