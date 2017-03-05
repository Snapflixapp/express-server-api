import config from '../config'
import promise from 'bluebird'
const c = config.get()

const options = {
  promiseLib: promise
}

const pgp = require('pg-promise')(options)
const connection = c.database
const db = pgp(connection)

module.exports = db
