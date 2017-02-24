'use strict'

const aws = require('aws-sdk')
const s3 = new aws.S3()
const { writeResponse } = require('../utils')

const bucketName = 'snapflix-videos'
const ACL = 'public-read'

aws.config.update({
  'accessKeyId': process.env.AWS_ACCESS_KEY_ID,
  'secretAccessKey': process.env.AWS_SECRET_ACCESS_KEY,
  'region': 'us-west-1'
})

exports.sign = (req, res, next) => {
  const filename = req.query.objectName
  const mimeType = req.query.contentType
  const ext = '.' + findType(mimeType)
  const filekey = filename + ext

  const params = {
    Bucket: bucketName,
    Key: filekey,
    ContentType: mimeType,
    ACL: ACL
  }

  s3.getSignedUrl('putObject', params, (err, url) => {
    if (err) {
      throw new Error(err.message)
    }

    const data = {
      signedUrl: url,
      publicUrl: `https://s3.amazon.com/${bucketName}/${filekey}`,
      filename: filename
    }
    writeResponse(res, data, 201)
  })
}

const findType = (string) => {
  let n = string.lastIndexOf('/')
  return string.substring(n + 1)
}
