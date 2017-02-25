'use strict'

const { all } = require('./model')
const db = require('../db')
const { writeResponse } = require('../utils')

exports.all = (req, res, next) => {
  all(db.getSession(req))
    .then(videos => writeResponse(res, videos, 200))
    .catch(next)
}
