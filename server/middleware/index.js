const bodyParser = require('body-parser')
const morgan = require('morgan')
const jwt = require('express-jwt')

module.exports = (app) => {
  app.use(bodyParser.urlencoded({ extended: true })) // https://github.com/expressjs/body-parser
  app.use(bodyParser.json()) // https://github.com/expressjs/body-parser
  app.use(morgan('dev')) // https://github.com/expressjs/morgan
  app.use(jwt({ secret: process.env.JWT_SECRET }).unless({ path: ['/', '/auth/login', '/auth/register'] }))
}
