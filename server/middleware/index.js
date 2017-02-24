const bodyParser = require('body-parser')
const morgan = require('morgan')
const jwt = require('express-jwt')
const cors = require('cors')

const whitelist = ['https://snapflixapp.com', 'https://staging.snapflixapp.com', 'http://localhost:8080']
const corsOptions = {
  origin: function (origin, callback) {
    const originIsWhitelisted = whitelist.indexOf(origin) !== -1
    callback(originIsWhitelisted ? null : 'Bad Request', originIsWhitelisted)
  }
}
module.exports = (app) => {
  app.use(cors(corsOptions)) // https://github.com/expressjs/cors
  app.use(bodyParser.urlencoded({ extended: true })) // https://github.com/expressjs/body-parser
  app.use(bodyParser.json()) // https://github.com/expressjs/body-parser
  app.use(morgan('dev')) // https://github.com/expressjs/morgan
  app.use(jwt({ secret: process.env.JWT_SECRET }).unless({ path: ['/', '/auth/login', '/auth/register'] }))
}
