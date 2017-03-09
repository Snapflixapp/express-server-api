'use strict'

import dotenv from 'dotenv'
dotenv.config()

import Config from './config'

import express from 'express'
import routes from './routes'

const app = express()

require('./middleware')(app)

app.use(routes)

app.get('/', (req, res) => {
  res.redirect(301, 'https://snapflixapp.com')
})

const baseUrl = process.env.NODE_ENV === 'production' ? 'https://staging.snapflixapp.com' : 'http://localhost:8080'

app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.redirect(401, baseUrl + '/signin')
  } else {
    res.status(err.status || 400).json(err.toString())
  }
})

app.listen(Config.port, () => {
  console.log('Listening on port ' + Config.port)
})

module.exports = app
