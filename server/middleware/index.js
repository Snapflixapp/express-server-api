const bodyParser = require('body-parser')
const morgan = require('morgan')
const jwt = require('express-jwt')
const cors = require('cors')

module.exports = (app) => {
  app.use('*', cors())

  // https://github.com/expressjs/body-parser
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())

  // https://github.com/expressjs/morgan
  app.use(morgan('dev'))

  // https://github.com/auth0/express-jwt
  app.use(jwt({ secret: process.env.JWT_SECRET }).unless({ path: ['/', '/auth/login', '/auth/register', '/graphql'] }))
}
