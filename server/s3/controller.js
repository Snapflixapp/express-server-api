'use strict'

const aws = require('aws-sdk')
const s3 = new aws.S3()
const db = require('../db')
const uuid = require('uuid')
const { store } = require('./model')
const { writeResponse } = require('../utils')

const inputBucket = 'snapflix-videos-raw'
const ACL = 'public-read'

aws.config.update({
  'accessKeyId': process.env.AWS_ACCESS_KEY_ID,
  'secretAccessKey': process.env.AWS_SECRET_ACCESS_KEY,
  'region': 'us-west-1'
})

// Creates a signed url from AWS S3 for video
// Naming format: user.id/video.id.ext
// e.g. 123456abc/abc123456.webm
exports.sign = (req, res, next) => {
  const fileId = uuid.v4()
  const userId = req.user._id
  const fileName = req.query.fileName
  const mimeType = req.query.contentType
  const ext = findType(mimeType)
  const filekey = `${userId}/${fileId}.${ext}`

  const params = {
    Bucket: inputBucket,
    Key: filekey,
    ContentType: mimeType,
    ACL: ACL
  }

  // TODO: wrap this into a promise
  s3.getSignedUrl('putObject', params, (err, url) => {
    if (err) {
      throw new Error(err.message)
    }

    store(db.getSession(req), req.user._id, fileId, fileName)
      .then((video) => {
        const data = {
          signedUrl: url,
          video: video
        }

        writeResponse(res, data, 201)
      })
      .catch(next)
  })
}

const findType = (string) => {
  let n = string.lastIndexOf('/')
  return string.substring(n + 1)
}
