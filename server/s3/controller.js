'use strict'

// const config = require('../config').get(process.env.NODE_ENV)
// const db = require('../db')
// const { store } = require('./model')
// const { writeResponse } = require('../utils')
const uuid = require('uuid')
const AWS = require('aws-sdk')
const Promise = require('bluebird')
const S3 = new Promise.promisifyAll(new AWS.S3());

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'us-west-1'
})

const inputBucket = 'snapflix-videos-raw'
const ACL = 'public-read'

// Creates a signed url from AWS S3 for video
// Naming format: user.id/video.id.ext
// e.g. 123456abc/abc123456.webm
exports.sign = (fileName, userName, contentType) => {
  const fileId = uuid.v4()
  const ext = findType(contentType || 'video/webm')
  const filekey = `${userName}/${fileId}.${ext}`

  // const params = {
  //   Bucket: inputBucket,
  //   Key: filekey,
  //   ContentType: contentType,
  //   ACL: ACL
  // }

  // TODO: wrap this into a promise
  return S3.getSignedUrlAsync('putObject', {
    Bucket: inputBucket,
    Key: filekey,
    ContentType: contentType,
    ACL: ACL
  })
  .then(data => {
    console.log('S3 Data: ', data)
  })
  .catch(error => {
    console.log('S3 Error: ', error)
  })
  //  => {
  //   if (err) {
  //     throw new Error(err.message)
  //   }
  //
  //   store(db.getSession(req), req.user._id, fileId, fileName)
  //     .then((video) => {
  //       const data = {
  //         signedUrl: url,
  //         video: video
  //       }
  //
  //       writeResponse(res, data, 201)
  //     })
  //     .catch(next)
  // })
}

const findType = (string) => {
  let n = string.lastIndexOf('/')
  return string.substring(n + 1)
}
