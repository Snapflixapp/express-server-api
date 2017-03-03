const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLList,
  GraphQLString,
  GraphQLNonNull,
  GraphQLID
} = require('graphql')

const { getVideos } = require('./dynamo')

const Video = new GraphQLObjectType({
  name: 'Video',
  description: 'snapflix video',
  fields: () => ({
    id: {type: GraphQLID},
    title: {type: GraphQLString},
    url: {type: GraphQLString}
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
    }
  }
})

const Schema = new GraphQLSchema({
  query: Query
})

module.exports = Schema
