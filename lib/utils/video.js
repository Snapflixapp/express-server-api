import { getRandomString } from './auth'

const encodeVideo = (user, title, contentType = 'video/webm') => {
  const ext = findType(contentType)
  const encodedTitle = encodeURI(title)
  const uuid = getRandomString(12)
  const key = `${user.username}/${uuid}.${ext}`

  return {
    title: encodedTitle,
    contentType: contentType,
    key: key,
    url: `https://s3-us-west-1.amazonaws.com/snapflix-videos-raw/${key}`
  }
}

const findType = (string) => {
  let n = string.lastIndexOf('/')
  return string.substring(n + 1)
}

export { encodeVideo, findType }
