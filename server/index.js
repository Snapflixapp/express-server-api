'use strict'

const config = require('./config').get(process.env.NODE_ENV)
const express = require('express')
const app = express()
const routes = require('./routes')
const { writeError } = require('./utils')

require('./middleware')(app)

app.get('/', (req, res) => {
  // res.redirect(301, 'https://snapflixapp.com')
  res.send('Hello, World!')
})

app.use(routes)

app.use((err, req, res, next) => {
  if (err) {
    writeError(res, err)
  } else {
    next()
  }
})

app.listen(config.port, () => {
  console.log('Listening on port ' + config.port)
})

module.exports = app
