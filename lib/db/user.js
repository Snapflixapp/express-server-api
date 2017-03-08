import Conn from './sequelize'
import Sequelize from 'sequelize'
import { signToken, saltHashPassword, comparePassword } from '../utils/auth'

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
})

User.Instance.prototype.validPassword = function (password) {
  return comparePassword(password, this)
}

User.signUp = (username, password) => {
  const passwordData = saltHashPassword(password)
  return User.findOrCreate({
    where: {
      username: username
    },
    defaults: {
      password: passwordData.passwordHash,
      salt: passwordData.salt
    }
  })
  .spread((user, created) => {
    if (!created) {
      throw new Error('Username already taken.')
    }
    return signToken(user)
  })
}

User.signIn = (username, password) => {
  return User.findOne({where: {username: username}})
    .then((user) => {
      if (!user || !user.validPassword(password)) {
        throw new Error('Invalid username or password')
      }
      return signToken(user)
    })
}

export default User
