import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID
} from 'graphql'

import User from './user'
import Video from './video'

const Comment = new GraphQLObjectType({
  name: 'Comment',
  description: 'Snapflix comment',
  fields: () => ({
    id: {type: GraphQLID},
    content: {type: GraphQLString},
    video: {
      type: Video,
      resolve (comment) {
        return comment.getVideo()
      }
    },
    user: {
      type: User,
      resolve (comment) {
        return comment.getUser()
      }
    }
  })
})

export default Comment
