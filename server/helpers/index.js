'use strict'

const _ = require('lodash')

exports.writeResponse = (res, response, status) => {
  res.status(status || 200).send(JSON.stringify(response))
}

exports.writeError = (res, error, status) => {
  res.status(error.status || status || 400).send(JSON.stringify(_.omit(error, ['status'])))
}
