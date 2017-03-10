import config from '../config'
import Promise from 'bluebird'

const S3 = new Promise.promisifyAll(new config.AWS.S3()) // eslint-disable-line

import { genRandomString } from './auth'

const encodeVideo = (user, title, contentType = 'video/webm') => {
  const ext = findType(contentType)
  const uuid = genRandomString(12)
  const key = `${user.username}/${uuid}.${ext}`

  return {
    title: title,
    contentType: contentType,
    key: key,
    url: `https://s3-us-west-1.amazonaws.com/snapflix-videos-raw/${key}`
  }
}

const getSignedUrl = (video, user) => {
  return S3.getSignedUrlAsync('putObject', {
    Bucket: 'snapflix-videos-raw',
    Key: video.key,
    ContentType: video.contentType,
    ACL: 'public-read'
  })
  .then(data => data)
  .catch(error => error)
}

const findType = (string) => {
  let n = string.lastIndexOf('/')
  return string.substring(n + 1)
}

export { encodeVideo, findType, getSignedUrl }
