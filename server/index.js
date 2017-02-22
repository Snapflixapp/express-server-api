'use strict'

// https://www.npmjs.com/package/dotenv
require('dotenv').config()

const express = require('express')
const app = express()
// const routes = require('./routes')
const { writeError } = require('./utils')

const port = process.env.PORT || 3000

// require('./middleware/middleware')(app)

app.get('/', (req, res) => {
  res.send('Hello, World')
})

// app.use(routes)

app.use((err, req, res, next) => {
  if (err && err.status) {
    writeError(res, err)
  } else {
    next(err)
  }
})

app.listen(port, () => {
  console.log('Listening on port ' + port)
})

module.exports = app
