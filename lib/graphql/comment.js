import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID
} from 'graphql'

import User from './user'

const Comment = new GraphQLObjectType({
  name: 'Comment',
  description: 'Snapflix comment',
  fields: () => ({
    id: {type: GraphQLID},
    content: {type: GraphQLString},
    user: {
      type: User,
      resolve (comment) {
        return comment.getUser()
      }
    }
  })
})

export default Comment
