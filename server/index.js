'use strict'
require('dotenv').config()
const express = require('express')
const app = express()
const routes = require('./routes')
const { writeError } = require('./utils')

const port = process.env.PORT || 3000

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

app.listen(port, () => {
  console.log('Listening on port ' + port)
})

module.exports = app
