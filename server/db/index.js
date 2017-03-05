const config = require('../config').get(process.env.NODE_ENV)
const promise = require('bluebird')

const options = {
  promiseLib: promise
}

const pgp = require('pg-promise')(options)
const connection = config.database
const db = pgp(connection)

module.exports = db
