const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLList,
  GraphQLString,
  GraphQLNonNull,
  GraphQLID
} = require('graphql')

const { getVideos,
  getVideosByUserId,
  getVideoByVideoId,
  getCommentsByVideoId,
  getUserByUserId,
  getUsers,
  getCommentsByUserId,
  createVideo,
  createUser,
  createComment,
  getSignedUrl
} = require('./db')

const Video = new GraphQLObjectType({
  name: 'Video',
  description: 'Snapflix video',
  fields: () => ({
    id: {type: GraphQLID},
    title: {type: GraphQLString},
    url: {type: GraphQLString},
    user: {
      type: User,
      resolve: function (video) {
        return getUserByUserId(video.user_id)
      }
    },
    comments: {
      type: new GraphQLList(Comment),
      resolve: function (video) {
        return getCommentsByVideoId(video.id)
      }
    },
    signedUrl: {
      type: GraphQLString,
      resolve: function (video, args, context) {
        return getSignedUrl(video, context)
      }
    }
  })
})

const Comment = new GraphQLObjectType({
  name: 'Comment',
  description: 'Snapflix comment',
  fields: () => ({
    id: {type: GraphQLID},
    content: {type: GraphQLString},
    user: {
      type: User,
      resolve: function (comment) {
        return getUserByUserId(comment.user_id)
      }
    }
  })
})

const User = new GraphQLObjectType({
  name: 'User',
  description: 'Snapflix user',
  fields: () => ({
    id: {type: GraphQLID},
    username: {type: GraphQLString},
    videos: {
      type: Video,
      resolve: function (user) {
        return getVideosByUserId(user.id)
      }
    },
    comments: {
      type: new GraphQLList(Comment),
      resolve: function (user) {
        return getCommentsByUserId(user.id)
      }
    }
  })
})

const Query = new GraphQLObjectType({
  name: 'Schema',
  description: 'Root schema',
  fields: () => ({
    videos: {
      type: new GraphQLList(Video),
      description: 'List of all videos',
      resolve: function () {
        return getVideos()
      }
    },
    video: {
      type: Video,
      description: 'Snapflix video',
      args: {
        id: {type: new GraphQLNonNull(GraphQLString)}
      },
      resolve: function (video, {id}) {
        return getVideoByVideoId(id)
      }
    },
    users: {
      type: new GraphQLList(User),
      description: 'List of all users',
      resolve: function () {
        return getUsers()
      }
    },
    user: {
      type: User,
      description: 'Snapflix user',
      args: {
        id: {type: new GraphQLNonNull(GraphQLString)},
        username: {type: GraphQLString}
      },
      resolve: function (video, {id, username}, context) {
        return getUserByUserId(id)
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
        title: {type: new GraphQLNonNull(GraphQLString)},
        user_id: {type: new GraphQLNonNull(GraphQLString)},
        username: {type: new GraphQLNonNull(GraphQLString)}
      },
      resolve: function (source, args, context) {
        return createVideo(args, context)
      }
    },
    createUser: {
      type: User,
      description: 'Create user',
      args: {
        username: {type: new GraphQLNonNull(GraphQLString)},
        password: {type: new GraphQLNonNull(GraphQLString)}
      },
      resolve: function (source, {username, password}, context) {
        return createUser(username, password)
      }
    },
    createComment: {
      type: Comment,
      args: {
        content: {type: new GraphQLNonNull(GraphQLString)},
        user_id: {type: new GraphQLNonNull(GraphQLString)},
        video_id: {type: new GraphQLNonNull(GraphQLString)}
      },
      resolve: function (source, {content, user_id, video_id}, context) {
        return createComment(content, user_id, video_id, context)
      }
    }
  }
})

const Schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation
})

module.exports = Schema
