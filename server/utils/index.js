'use strict'

exports.writeResponse = (res, response, status) => {
  res.status(status || 200).json(response)
}

exports.writeError = (res, error, status) => {
  res.status(400).send(error)
}
