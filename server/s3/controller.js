'use strict'

const aws = require('aws-sdk')
const s3 = new aws.S3()
const uuid = require('uuid')
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

  s3.getSignedUrl('putObject', params, (err, url) => {
    if (err) {
      throw new Error(err.message)
    }

    // TODO: Save video to database with id, title, and user_id, processing: true

    const data = {
      signedUrl: url
    }

    writeResponse(res, data, 201)
  })
}

const findType = (string) => {
  let n = string.lastIndexOf('/')
  return string.substring(n + 1)
}
