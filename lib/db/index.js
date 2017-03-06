import config from '../config'
const c = config.get()

import Sequelize from 'sequelize'
import { each, random, times } from 'lodash'
import crypto from 'crypto'
import faker from 'faker'
import jwt from 'jsonwebtoken'

const Conn = new Sequelize(c.database)

Conn.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.')
  })
  .catch((err) => {
    console.log('Unable to connect to the database:', err)
  })

const User = Conn.define('user', {
  username: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  salt: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
  classMethods: {
    generateHash: (password) => {
      return saltHashPassword(password)
    }
  },
  instanceMethods: {
    validPassword: function (password) {
      return this.password === sha512(password, this.salt).passwordHash
    },
    signToken: function () {
      return jwt.sign({
        _id: this.id,
        username: this.username
      }, process.env.JWT_SECRET, { expiresIn: '1h' })
    }
  }
})

const Video = Conn.define('video', {
  title: Sequelize.STRING,
  contentType: Sequelize.STRING,
  key: Sequelize.STRING,
  url: Sequelize.STRING
}, {
  classMethods: {
    encodeVideo: function (user, contentType = 'video/webm') {
      const ext = findType(contentType)
      const encodedTitle = encodeURIComponent(`Sample title by ${user.username}`)
      const uuid = genRandomString(12)
      const key = `${user.username}/${encodedTitle}-${uuid}.${ext}`

      return {
        title: encodedTitle,
        contentType: contentType,
        key: key,
        url: `https://s3-us-west-1.amazonaws.com/snapflix-videos-raw/${key}`
      }
    }
  },
  instanceMethods: {
    setType: function (password) {
      return findType(this.contentType)
    }
  }
})

const Comment = Conn.define('comment', {
  content: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

User.hasMany(Video)
User.hasMany(Comment)

Video.hasMany(Comment)
Video.belongsTo(User)

Comment.belongsTo(Video)
Comment.belongsTo(User)

// if (process.env.NODE_ENV === 'development') {
Conn.sync({force: true}).then(() => {
  const users = ['michael', 'jasmine', 'maurice', 'johnny']
  each(users, (user) => {
    const passwordData = saltHashPassword('password')
    User.create({
      username: user,
      salt: passwordData.salt,
      password: passwordData.passwordHash
    })
    .then((user) => {
      return times(random(1, 3), () => {
        const video = Video.encodeVideo(user)
        return user.createVideo({
          title: video.title,
          contentType: video.contentType,
          key: video.key,
          url: `https://s3-us-west-1.amazonaws.com/snapflix-videos-raw/${video.key}`
        })
      })
    })
    .then(() => {
      return User.findAll()
    })
    .then((users) => {
      each(users, (user) => {
        times(random(1, 3), () => {
          user.createComment({
            content: `${faker.lorem.sentence()} by ${user.username}`,
            videoId: random(1, 4)
          })
        })
      })
    })
  })
})
// }

const genRandomString = (length) => {
  return crypto.randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length)
}

const sha512 = (password, salt) => {
  const hash = crypto.createHmac('sha512', salt)
  hash.update(password)
  const value = hash.digest('hex')
  return {
    salt: salt,
    passwordHash: value
  }
}

const saltHashPassword = (userpassword) => {
  const salt = genRandomString(16)
  return sha512(userpassword, salt)
}

const findType = (string) => {
  let n = string.lastIndexOf('/')
  return string.substring(n + 1)
}

export default Conn
