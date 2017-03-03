const config = require('../config').get(process.env.NODE_ENV)
const Promise = require('bluebird')
const uuid = require('uuid')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')

const docClient = new config.aws.DynamoDB.DocumentClient()
const videosTable = config.project + '-videos-' + config.env
const usersTable = config.project + '-users-' + config.env
// const commentsTable = config.project + '-comments-' + config.env

exports.createVideo = (title) => {
  return new Promise((resolve, reject) => {
    const id = uuid.v4()

    const video = {
      id: id,
      title: title,
      url: 'https://s3-us-west-1.amazonaws.com/snapflix-videos-raw/' + id
    }

    const params = {
      TableName: videosTable,
      Item: video
    }

    docClient.put(params, (err, data) => {
      if (err) return reject(err)
      return resolve(video)
    })
  })
}

exports.getVideos = () => {
  return new Promise((resolve, reject) => {
    const params = {
      TableName: videosTable,
      AttributesToGet: [
        'id',
        'title',
        'url'
      ]
    }

    docClient.scan(params, (err, data) => {
      if (err) return reject(err)
      return resolve(data['Items'])
    })
  })
}

exports.createUser = (username, password) => {
  return new Promise((resolve, reject) => {
    const user = {
      username: username,
      password: hashPassword(username, password)
    }

    const params = {
      TableName: usersTable,
      Item: user,
      ConditionExpression: 'attribute_not_exists(username)'
    }

    docClient(params, (err, data) => {
      if (err) return reject(err)

      let token = signToken(data['Item'])
      return resolve(token)
    })
  })
}

exports.getUser = (username) => {
  return new Promise((resolve, reject) => {
    const params = {
      TableName: usersTable,
      Key: {
        username: username
      },
      AttributesToGet: [
        'username'
      ]
    }

    docClient.get(params, (err, data) => {
      if (err) return reject(err)
      return resolve(data['Item'])
    })
  })
}

const hashPassword = (username, password) => {
  let s = username + ':' + password
  return crypto.createHash('sha256').update(s).digest('hex')
}

const signToken = (user) => {
  return jwt.sign({
    username: user.username
  }, process.env.JWT_SECRET, { expiresIn: '1h' })
}
