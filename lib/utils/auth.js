import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import Promise from 'bluebird'
const jwtVerifyAsync = Promise.promisify(jwt.verify, {context: jwt})

exports.getTokenFromRequest = req => (
  req.body.token || req.params.token || req.headers.authorization
)

exports.signToken = function (user) {
  return jwt.sign({
    _id: user.id || genRandomString(12),
    username: user.username
  }, process.env.JWT_SECRET, { expiresIn: '1h' })
}

exports.verifyToken = (token) => {
  console.log('Token in verify token: ', token)
  return jwtVerifyAsync(token, process.env.JWT_SECRET)
}

exports.getRandomString = (length) => {
  return genRandomString(length)
}

exports.saltHashPassword = (userpassword) => {
  const salt = genRandomString(16)
  return sha512(userpassword, salt)
}

exports.comparePassword = (password, user) => {
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
