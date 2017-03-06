import config from '../config'
import Promise from 'bluebird'

const c = config.get()
const S3 = new Promise.promisifyAll(new c.AWS.S3()) // eslint-disable-line

import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLID
} from 'graphql'

import User from './user'
import Comment from './comment'

const Video = new GraphQLObjectType({
  name: 'Video',
  description: 'Snapflix video',
  fields: () => ({
    id: {type: GraphQLID},
    title: {type: GraphQLString},
    url: {type: GraphQLString},
    key: {type: GraphQLString},
    contentType: {type: GraphQLString},
    user: {
      type: User,
      resolve (video) {
        return video.getUser()
      }
    },
    comments: {
      type: new GraphQLList(Comment),
      resolve (video) {
        return video.getComments()
      }
    },
    signedUrl: {
      type: GraphQLString,
      resolve (video, _, {user}) {
        return getSignedUrl(video, user)
      }
    }
  })
})

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

export default Video
