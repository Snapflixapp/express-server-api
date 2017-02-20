
const express = require('express')
const neo4j = require('neo4j-driver').v1
const app = express()

require('dotenv').config() // https://www.npmjs.com/package/dotenv

const port = process.env.PORT || 8080

require('./middleware/middleware')(app)

var driver = neo4j.driver('bolt://hobby-cnjaehapojekgbkeeekdoaol.dbs.graphenedb.com:24786', neo4j.auth.basic('snapflix','b.LdYmeSOnEOWU.6mvAsh34bQkd2eX8'))
var session = driver.session()

app.get('/', (req, res) => {
  res.status(200)
  res.send('Hello, World!')
})

app.listen(port, () => {
  console.log('Listening on port ' + port)
})

module.exports = app
