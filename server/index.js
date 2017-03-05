'use strict'

// https://www.npmjs.com/package/dotenv
require('dotenv').config()

const express = require('express')
const app = express()
const routes = require('./routes')
const { writeError } = require('./utils')
const { faceAuth } = require('./faceAuth')
// const { faceSignUp } = require('./faceAuth')

const port = process.env.PORT || 3000

require('./middleware')(app)

app.get('/', (req, res) => {
  // res.redirect(301, 'https://snapflixapp.com')
  res.send('Hello, World!')
})

app.post('/faceAuth', faceAuth)
// app.post('/faceAuth', faceSignUp)

app.use(routes)

app.use((err, req, res, next) => {
  if (err) {
    writeError(res, err)
  } else {
    next()
  }
})

app.listen(port, () => {
  console.log('Listening on port ' + port)
})

module.exports = app
