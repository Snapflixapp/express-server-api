const Promise = require('bluebird')
const AWS = require('aws-sdk')

const config = {
  'accessKeyId': process.env.AWS_ACCESS_KEY_ID,
  'secretAccessKey': process.env.AWS_SECRET_ACCESS_KEY,
  'region': 'us-west-1',
  'endpoint': 'http://localhost:8000'
}

const docClient = new AWS.DynamoDB.DocumentClient(config)
const stage = 'development'
const projectName = 'snapflix'
const videosTable = projectName + '-videos-' + stage
const usersTable = projectName + '-users-' + stage
const commentsTable = projectName + '-comments-' + stage

exports.createVideo = () => {
  return new Promise((resolve, reject) => {
    const params = {
      TableName: videosTable,
      Item: video
    }
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
