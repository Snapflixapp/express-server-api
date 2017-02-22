'use strict'

const { omit } = require('lodash')

exports.writeResponse = (res, response, status) => {
  res.status(status || 200).json(response)
}

exports.writeError = (res, error, status) => {
  res.status(error.status || status || 400).json(omit(error, ['status']))
}
