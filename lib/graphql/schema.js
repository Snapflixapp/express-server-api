import crypto from 'crypto'
import config from '../config'
import Promise from 'bluebird'

const c = config.get()
const S3 = new Promise.promisifyAll(new c.AWS.S3())

import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLList,
  GraphQLString,
  GraphQLNonNull,
  GraphQLID
} from 'graphql'

import Db from '../db'

const Video = new GraphQLObjectType({
  name: 'Video',
  description: 'Snapflix video',
  fields: () => ({
    id: {
      type: GraphQLID,
      resolve (video) {
        return video.id
      }
    },
    title: {
      type: GraphQLString,
      resolve (video) {
        return video.title
      }
    },
    url: {
      type: GraphQLString,
      resolve (video) {
        return video.url
      }
    },
    key: {
      type: GraphQLString,
      resolve (video) {
        return video.key
      }
    },
    contentType: {
      type: GraphQLString,
      resolve (video) {
        return video.contentType
      }
    },
    user: {
      type: User,
      resolve (video) {
        return video.getUser()
      }
    },
    comments: {
      type: new GraphQLList(Comment),
      resolve (video) {
        return video.getComments()
      }
    },
    signedUrl: {
      type: GraphQLString,
      resolve (video, _, {user}) {
        return getSignedUrl(video, user)
      }
    }
  })
})

const Comment = new GraphQLObjectType({
  name: 'Comment',
  description: 'Snapflix comment',
  fields: () => ({
    id: {
      type: GraphQLID,
      resolve (comment) {
        return comment.id
      }
    },
    content: {
      type: GraphQLString,
      resolve (comment) {
        return comment.content
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

const User = new GraphQLObjectType({
  name: 'User',
  description: 'Snapflix user',
  fields: () => ({
    id: {
      type: GraphQLID,
      resolve (user) {
        return user.id
      }
    },
    username: {
      type: GraphQLString,
      resolve (user) {
        return user.username
      }
    },
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
          const ext = findType(args.contentType)
          const uuid = crypto.randomBytes(12).toString('hex')
          const encodedTitle = encodeURIComponent(args.title)
          const key = `${user.username}/${encodedTitle}-${uuid}.${ext}`
          return user.createVideo({
            title: args.title,
            contentType: args.contentType,
            key: key,
            url: `https://s3-us-west-1.amazonaws.com/snapflix-videos-raw/${key}`
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

const getSignedUrl = (video, user) => {
  return S3.getSignedUrlAsync('putObject', {
    Bucket: 'snapflix-videos-raw',
    Key: video.key,
    ContentType: video.contentType,
    ACL: 'public-read'
  })
  .then(data => data)
  .catch(error => error)
}

const findType = (string) => {
  let n = string.lastIndexOf('/')
  return string.substring(n + 1)
}

const Schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation
})

module.exports = Schema
