import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLList,
  GraphQLString,
  GraphQLNonNull,
  GraphQLID
} from 'graphql'

import Db from '../db'
import User from './user'
import Comment from './comment'
import Video from './video'

const Query = new GraphQLObjectType({
  name: 'Query',
  description: 'Root query',
  fields: () => ({
    videos: {
      type: new GraphQLList(Video),
      description: 'List of all videos',
      args: {
        id: {type: GraphQLID},
        userId: {type: GraphQLID}
      },
      resolve (videos, args, context) {
        return Db.models.video.findAll({where: args})
      }
    },
    video: {
      type: Video,
      description: 'Snapflix video',
      args: {
        id: {type: GraphQLID}
      },
      resolve (video, args, context) {
        return Db.models.video.findOne({where: args})
      }
    },
    users: {
      type: new GraphQLList(User),
      description: 'List of all users',
      args: {
        id: {type: GraphQLID},
        username: {type: GraphQLString},
        videoId: {type: GraphQLID}
      },
      resolve (users, args, context) {
        return Db.models.user.findAll({where: args})
      }
    },
    user: {
      type: User,
      description: 'Snapflix user',
      args: {
        id: {type: GraphQLID},
        username: {type: GraphQLString}
      },
      resolve (user, args, context) {
        return Db.models.user.findOne({where: args})
      }
    },
    comments: {
      type: new GraphQLList(Comment),
      description: 'List of all comments',
      args: {
        id: {type: GraphQLID}
      },
      resolve (comment, args, {user}) {
        return Db.models.comment.findAll({where: args})
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
        contentType: {type: new GraphQLNonNull(GraphQLString)},
        userId: {type: GraphQLString}
      },
      resolve (_, args, {user}) {
        return Db.models.user.findOne({
          where: {
            id: args.userId || user._id
          }
        })
        .then((user) => {
          const video = Db.models.video.encodeVideo(user, args.contentType)
          return user.createVideo({
            title: video.title,
            contentType: video.contentType,
            key: video.key,
            url: `https://s3-us-west-1.amazonaws.com/snapflix-videos-raw/${video.key}`
          })
        })
      }
    },
    createComment: {
      type: Comment,
      args: {
        content: {type: new GraphQLNonNull(GraphQLString)},
        videoId: {type: new GraphQLNonNull(GraphQLString)},
        userId: {type: GraphQLString}
      },
      resolve (_, args, {user}) {
        return Db.models.video.findOne({
          where: {
            id: args.videoId
          }
        })
        .then((video) => {
          return video.createComment({
            content: args.content,
            userId: args.userId || user._id
          })
        })
      }
    }
  }
})

const Schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation
})

module.exports = Schema
