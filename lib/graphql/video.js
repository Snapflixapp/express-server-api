import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLID
} from 'graphql'

import { getSignedUrl } from '../utils/video'
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

export default Video
