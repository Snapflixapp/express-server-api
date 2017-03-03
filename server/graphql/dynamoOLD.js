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

exports.createVideo = (video) => {
  return new Promise((resolve, reject) => {
    var params = {
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
    var params = {
      TableName: videosTable,
      AttributesToGet: [
        'id',
        'title',
        'url',
        'user'
      ]
    }

    docClient.scan(params, (err, data) => {
      if (err) return reject(err)
      return resolve(data['Items'])
    })
  })
}

exports.getVideo = (id) => {
  return new Promise((resolve, reject) => {
    var params = {
      TableName: videosTable,
      Key: {
        id: id
      },
      AttributesToGet: [
        'id',
        'title',
        'url',
        'user'
      ]
    }

    docClient.get(params, (err, data) => {
      if (err) return reject(err)
      return resolve(data['Item'])
    })
  })
}

exports.createUser = (user) => {
  return new Promise((resolve, reject) => {
    var params = {
      TableName: usersTable,
      Item: user
    }

    docClient.put(params, (err, data) => {
      if (err) return reject(err)
      return resolve(user)
    })
  })
}

exports.getUser = (id) => {
  return new Promise((resolve, reject) => {
    var params = {
      TableName: usersTable,
      Key: {
        id: id
      },
      AttributesToGet: [
        'id',
        'username',
        'videos',
        'password'
      ]
    }

    docClient.get(params, (err, data) => {
      if (err) return reject(err)
      return resolve(data['Item'])
    })
  })
}

exports.getUsers = () => {
  return new Promise((resolve, reject) => {
    var params = {
      TableName: usersTable,
      AttributesToGet: [
        'id',
        'username'
      ]
    }

    docClient.scan(params, (err, data) => {
      if (err) return reject(err)
      return resolve(data['Items'])
    })
  })
}

exports.createComment = (comment) => {
  return new Promise((resolve, reject) => {
    var params = {
      TableName: commentsTable,
      Item: comment
    }

    docClient.put(params, (err, data) => {
      if (err) return reject(err)
      return resolve(comment)
    })
  })
}

// exports.getComments = (video) => {
//   return new Promise((resolve, reject) => {
//     var params = {
//       TableName: commentsTable,
//       AttributesToGet: [
//         'id',
//         'content',
//         'user',
//         'video'
//       ]
//     }
//
//     docClient.scan(params, (err, data) => {
//       if (err) return reject(err)
//       var result = []
//       data['Items'].map(function (item) {
//         if (item.video === video.id) {
//           return result.push(item)
//         }
//       })
//       // console.log('data: ', data)
//       console.log('result: ', result)
//       return resolve(result)
//     })
//   })
// }

exports.getComments = (video) => {
  return new Promise((resolve, reject) => {
    var params = {
      TableName: commentsTable,
      AttributesToGet: [
        'id',
        'content',
        'user',
        'video'
      ]
    }

    docClient.scan(params, (err, data) => {
      if (err) return reject(err)
      return resolve(data['Items'])
    })
  })
}
