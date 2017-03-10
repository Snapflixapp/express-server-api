'use strict'

import config from './config'
import express from 'express'
import routes from './routes'

const app = express()

require('./middleware')(app)

app.use(routes)

app.get('/', (req, res) => {
  res.send('Hello, World')
})

app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.redirect(401, config.baseUrl + '/signin')
  } else {
    res.status(err.status || 400).json(err.toString())
  }
})

app.listen(config.port, () => {
  console.log('Listening on port ' + config.port)
})

module.exports = app
