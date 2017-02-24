'use strict'

const { writeResponse } = require('../utils')

exports.list = (req, res, next) => {
  writeResponse(res, {message: 'Inside video list'})
}
