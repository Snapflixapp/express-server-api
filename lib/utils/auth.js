import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import Promise from 'bluebird'
import config from '../config'
const jwtVerifyAsync = Promise.promisify(jwt.verify, {context: jwt})

const getTokenFromRequest = req => (
  req.body.token || req.params.token || req.headers.authorization
)

const signToken = function (user) {
  return jwt.sign({
    _id: user.id || genRandomString(12),
    username: user.username
  }, config.auth.secret, { expiresIn: '1h' })
}

const verifyToken = (token) => {
  console.log('Secret: ', config.auth.secret)
  return jwtVerifyAsync(token, config.auth.secret)
}

const saltHashPassword = (userpassword) => {
  const salt = genRandomString(16)
  return sha512(userpassword, salt)
}

const comparePassword = (password, user) => {
  return user.password === sha512(password, user.salt).passwordHash
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

const genRandomString = (length) => {
  return crypto.randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length)
}

export {
  getTokenFromRequest,
  signToken,
  verifyToken,
  saltHashPassword,
  comparePassword,
  genRandomString
}
