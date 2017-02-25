const bodyParser = require('body-parser')
const morgan = require('morgan')
const jwt = require('express-jwt')

module.exports = (app) => {
  // enable CORS
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Credentials', 'true')
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    next()
  })

  // https://github.com/expressjs/body-parser
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())

  // https://github.com/expressjs/morgan
  app.use(morgan('dev'))

  // https://github.com/auth0/express-jwt
  app.use(jwt({ secret: process.env.JWT_SECRET }).unless({ path: ['/', '/auth/login', '/auth/register'] }))
}
