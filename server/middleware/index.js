const bodyParser = require('body-parser')
const morgan = require('morgan')
const jwt = require('express-jwt')
const cors = require('cors')

module.exports = (app) => {
  app.use('*', cors())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())
  app.use(morgan('dev'))
  app.use(jwt({ secret: process.env.JWT_SECRET }).unless({ path: ['/', '/login', '/register', '/faceAuth', '/graphql'] }))
}
