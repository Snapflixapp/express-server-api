import bodyParser from 'body-parser'
import morgan from 'morgan'
import jwt from 'express-jwt'
import cors from 'cors'

module.exports = (app) => {
  app.use('*', cors())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())
  app.use(morgan('dev'))
  app.use(jwt({ secret: process.env.JWT_SECRET }).unless({ path: ['/', '/login', '/register', '/faceAuth', '/graphql'] }))
}
