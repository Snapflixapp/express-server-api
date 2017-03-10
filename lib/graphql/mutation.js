import { verifyToken, signToken } from '../utils/auth'
import { encodeVideo } from '../utils/video'

import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull
} from 'graphql'

import Db from '../db'
import User from './user'
import Comment from './comment'
import Video from './video'
import Auth from './auth'

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
      resolve (_, args, context) {
        return verifyToken(context)
          .then(({ _id }) => {
            return Db.models.user.findOne({
              where: {
                id: args.userId || _id
              }
            })
            .then((user) => {
              const video = encodeVideo(user, args.title, args.contentType)
              return user.createVideo({
                title: video.title,
                contentType: video.contentType,
                key: video.key,
                url: `https://s3-us-west-1.amazonaws.com/snapflix-videos-raw/${video.key}`
              })
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
      resolve (_, args, context) {
        return Db.models.video.findOne({
          where: {
            id: args.videoId
          }
        })
        .then((video) => {
          return video.createComment({
            content: args.content,
            userId: args.userId,
            videoId: args.videoId
          })
        })
      }
    },
    signIn: {
      type: Auth,
      description: 'User authentication token',
      args: {
        username: {type: GraphQLString},
        password: {type: GraphQLString}
      },
      resolve (_, { username, password }, {user}) {
        const errors = []
        return Db.models.user.signIn(username, password)
          .then(token => ({token, errors}))
          .catch((err) => {
            if (err.code && err.message) {
              errors.push({
                key: err.code,
                value: err.message
              })
              return { token: null, errors }
            }

            throw new Error(err)
          })
      }
    },
    signUp: {
      type: Auth,
      description: 'User registration token',
      args: {
        username: {type: new GraphQLNonNull(GraphQLString)},
        password: {type: new GraphQLNonNull(GraphQLString)}
      },
      resolve (_, { username, password }, {user}) {
        const errors = []
        return Db.models.user.signUp(username, password)
          .then(token => ({token, errors}))
          .catch((err) => {
            if (err.code && err.message) {
              errors.push({
                key: err.code,
                value: err.message
              })

              return { token: null, errors }
            }

            throw new Error(err)
          })
      }
    },
    kairosSignIn: {
      type: Auth,
      description: 'Auth token for kairos',
      args: {
        username: {type: new GraphQLNonNull(GraphQLString)}
      },
      resolve (_, { username }, {user}) {
        const errors = []
        return Db.models.user.findOne({
          where: {
            username: username
          }
        })
        .then((user) => {
          if (user) {
            return { token: signToken(user), errors }
          }
        })
        .catch((err) => {
          if (err.code && err.message) {
            errors.push({
              key: err.code,
              value: err.message
            })
            return {token: null, errors: errors}
          }
        })
      }
    },
    kairosFailure: {
      type: User,
      description: 'User registration token',
      args: {
        username: {type: new GraphQLNonNull(GraphQLString)}
      },
      resolve (_, { username }, {user}) {
        return Db.models.user.findOne({
          where: {
            username: username
          }
        })
        .then((user) => {
          user.destroy()
          return user
        })
      }
    }
  }
})

export default Mutation
