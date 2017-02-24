'use strict'

// https://www.npmjs.com/package/dotenv
require('dotenv').config()

const express = require('express')
const app = express()
const routes = require('./routes')
const { writeError } = require('./utils')

const port = process.env.PORT || 3000

require('./middleware')(app)

app.get('/', (req, res) => {
  res.redirect(301, 'https://snapflixapp.com')
})

app.use(routes)

app.use((err, req, res, next) => {
  if (err) {
    writeError(res, err.message)
  } else {
    next(err)
  }
})

app.listen(port, () => {
  console.log('Listening on port ' + port)
})

module.exports = app
