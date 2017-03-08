import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList
} from 'graphql'

const Auth = new GraphQLObjectType({
  name: 'Auth',
  description: 'User authentication token',
  fields: () => ({
    token: {type: GraphQLString},
    errors: { type: new GraphQLNonNull(new GraphQLList(GraphQLString)) }
  })
})

export default Auth
