'use strict'

const _ = require('lodash')

exports.writeResponse = (res, response, status) => {
  res.status(status || 200).json(response)
}

exports.writeError = (res, error, status) => {
  res.status(error.status || status || 400).json(_.omit(error, ['status']))
}
