const jwt = require('jsonwebtoken')
// const checkToken = expressJwt({secret: process.env.JWT_SECRET})
// const User = require('../users')

// util method to sign tokens on register and login
exports.signToken = (user) => {
  return jwt.sign(
    {
      _id: user.id,
      _name: user.username
    },
    process.env.JWT_SECRET,
    {expiresIn: '1h'}
  )
}
