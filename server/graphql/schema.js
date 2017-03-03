const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLList,
  GraphQLString,
  GraphQLNonNull,
  GraphQLID
} = require('graphql')

const { getVideos, createVideo, createUser } = require('./dynamo')

const Video = new GraphQLObjectType({
  name: 'Video',
  description: 'Snapflix video',
  fields: () => ({
    id: {type: GraphQLID},
    title: {type: GraphQLString},
    url: {type: GraphQLString}
  })
})

const User = new GraphQLObjectType({
  name: 'User',
  description: 'Snapflix user',
  fields: () => ({
    username: {type: GraphQLString}
  })
})

const Query = new GraphQLObjectType({
  name: 'Schema',
  description: 'Root schema',
  fields: () => ({
    videos: {
      type: new GraphQLList(Video),
      description: 'List of all videos',
      resolve: function (source) {
        return getVideos()
      }
    }
  })
})

const Mutation = new GraphQLObjectType({
  name: 'Mutations',
  fields: {
    createVideo: {
      type: Video,
      args: {
        title: {type: new GraphQLNonNull(GraphQLString)}
      },
      resolve: function (source, {title}, context) {
        return createVideo(title)
      }
    },
    createUser: {
      type: User,
      args: {
        username: {type: new GraphQLNonNull(GraphQLString)},
        password: {type: new GraphQLNonNull(GraphQLString)}
      },
      resolve: function (source, {username, password}, context) {
        return createUser(username, password)
      }
    }
  }
})

const Schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation
})

module.exports = Schema
