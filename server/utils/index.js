'use strict'

const config = require('../config').get(process.env.NODE_ENV)

exports.writeResponse = (res, response, status) => {
  res.status(status || 200).json(response)
}

exports.writeError = (res, err, status) => {
  if (err.name === 'UnauthorizedError') {
    res.redirect(401, config.baseUrl + '/signin')
  } else {
    res.status(err.status || status || 400).json(err.toString())
  }
}
