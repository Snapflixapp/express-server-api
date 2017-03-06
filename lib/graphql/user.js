import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLID
} from 'graphql'

import Comment from './comment'
import Video from './video'

const User = new GraphQLObjectType({
  name: 'User',
  description: 'Snapflix user',
  fields: () => ({
    id: {type: GraphQLID},
    username: {type: GraphQLString},
    videos: {
      type: new GraphQLList(Video),
      resolve (user) {
        return user.getVideos()
      }
    },
    comments: {
      type: new GraphQLList(Comment),
      resolve (user) {
        return user.getComments()
      }
    }
  })
})

export default User
