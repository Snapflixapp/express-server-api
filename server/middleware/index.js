const bodyParser = require('body-parser')
const morgan = require('morgan')
const jwt = require('express-jwt')
const cors = require('cors')
const { writeResponse } = require('../utils')

const whitelist = ['snapflixapp.com', 'staging.snapflixapp.com', 'localhost:3000', 'localhost:8080']
const corsOptions = {
  origin: (origin, callback) => {
    const originIsWhitelisted = whitelist.indexOf(origin) !== -1
    callback(originIsWhitelisted ? null : origin, originIsWhitelisted)
  }
}

module.exports = (app) => {
  // really dumb work around to fix this issue: https://github.com/expressjs/cors/issues/71
  app.use((req, res, next) => {
    writeResponse(res, { origin: req.headers.origin, host: req.headers.host }, 200)
    // req.headers.origin = req.headers.origin || req.headers.host
    // next()
  })
  app.use(cors(corsOptions)) // https://github.com/expressjs/cors
  app.use(bodyParser.urlencoded({ extended: true })) // https://github.com/expressjs/body-parser
  app.use(bodyParser.json()) // https://github.com/expressjs/body-parser
  app.use(morgan('dev')) // https://github.com/expressjs/morgan
  app.use(jwt({ secret: process.env.JWT_SECRET }).unless({ path: ['/', '/auth/login', '/auth/register'] }))
}
