import Conn from './sequelize'
import { each } from 'lodash'
import { saltHashPassword } from '../utils/auth'

import User from './user'
import Video from './video'
import Comment from './comment'

User.hasMany(Video)
User.hasMany(Comment)

Video.hasMany(Comment)
Video.belongsTo(User)

Comment.belongsTo(Video)
Comment.belongsTo(User)

Conn.sync({force: true}).then(() => {
  if (process.env.NODE_ENV === 'development') {
    const users = ['michael', 'jasmine', 'maurice', 'johnny']
    each(users, (user) => {
      const passwordData = saltHashPassword('password')
      User.create({
        username: user,
        salt: passwordData.salt,
        password: passwordData.passwordHash
      })
    })
  }
})

export default Conn
