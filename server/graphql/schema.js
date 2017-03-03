const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLList,
  GraphQLString,
  GraphQLNonNull
} = require('graphql')

const { getVideos, getUser, getUsers, getComments, createVideo, createUser } = require('./dynamo')

const User = new GraphQLObjectType({
  name: 'User',
  description: 'User of the video',
  fields: () => ({
    id: {type: GraphQLString},
    username: {type: GraphQLString}
  })
})

const Comment = new GraphQLObjectType({
  name: 'Comment',
  description: 'Comment on the video',
  fields: () => ({
    id: {type: GraphQLString},
    content: {type: GraphQLString},
    user: {
      type: User,
      resolve: function ({user}) {
        return getUser(user)
      }
    }
  })
})

const Video = new GraphQLObjectType({
  name: 'Video',
  description: 'Video content',
  fields: () => ({
    id: {type: GraphQLString},
    title: {type: GraphQLString},
    url: {type: GraphQLString},
    user: {
      type: User,
      resolve: function ({user}) {
        return getUser(user)
      }
    },
    comments: {
      type: new GraphQLList(Comment),
      resolve: function (video) {
        return getComments()
      }
    }
  })
})

const Query = new GraphQLObjectType({
  name: 'Schema',
  description: 'Root Schema',
  fields: () => ({
    videos: {
      type: new GraphQLList(Video),
      description: 'List of videos',
      resolve: function (source, {category}) {
        return getVideos()
      }
    },
    users: {
      type: new GraphQLList(User),
      description: 'List of users',
      resolve: function () {
        return getUsers()
      }
    },
    user: {
      type: User,
      description: 'Get User by id',
      args: {
        id: {type: new GraphQLNonNull(GraphQLString)}
      },
      resolve: function (source, {id}) {
        return getUser(id)
      }
    }
  })
})

const Mutuation = new GraphQLObjectType({
  name: 'Mutations',
  fields: {
    createVideo: {
      type: Video,
      description: 'Create video',
      args: {
        id: {type: new GraphQLNonNull(GraphQLString)},
        title: {type: new GraphQLNonNull(GraphQLString)},
        url: {type: new GraphQLNonNull(GraphQLString)},
        user: {type: new GraphQLNonNull(GraphQLString), description: 'Id of the user'}
      },
      resolve: function (source, args) {
        return createVideo(args)
      }
    },
    createUser: {
      type: User,
      description: 'Create user',
      args: {
        id: {type: new GraphQLNonNull(GraphQLString)},
        username: {type: new GraphQLNonNull(GraphQLString)},
        password: {type: new GraphQLNonNull(GraphQLString)}
      },
      resolve: function (source, args) {
        return createUser(args)
      }
    }
  }
})

const Schema = new GraphQLSchema({
  query: Query,
  mutation: Mutuation
})

module.exports = Schema
