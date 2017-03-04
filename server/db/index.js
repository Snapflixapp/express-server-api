const promise = require('bluebird')

const options = {
  promiseLib: promise
}

const pgp = require('pg-promise')(options)
// const connection = process.env.RDS_CONNECTION_URL || 'postgres://localhost:5432/snapflix'
const connection = 'postgres://localhost:5432/snapflix'
const db = pgp(connection)

module.exports = db
