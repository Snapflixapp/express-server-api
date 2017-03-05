'use strict'

import dotenv from 'dotenv'
dotenv.config()

import config from './config'
const c = config.get()

import express from 'express'
import routes from './routes'
import { writeError } from './utils'

const app = express()

require('./middleware')(app)

app.use(routes)

app.get('/', (req, res) => {
  // res.redirect(301, 'https://snapflixapp.com')
  res.send('Hello, World!')
})

app.use((err, req, res, next) => {
  if (err) {
    writeError(res, err)
  } else {
    next()
  }
})

app.listen(c.port, () => {
  console.log('Listening on port ' + c.port)
})

module.exports = app
