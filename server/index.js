
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
  // session
  // .run("MATCH (n:Person) RETURN n LIMIT 25")
  // .then(function(result) {
  //   var usersArr = []
  //   result.records.forEach(function(record) {
  //     usersArr.push({
  //       id: record._fields[0].identity.low,
  //       name: record._fields[0].properties.name
  //     })
  //     console.log(record._fields[0].properties)
  //   })
  //   console.log({users: usersArr})
  res.send('hello from jasmine!')
  // })
  // .catch(function(err) {
  //   console.log(err)
  // })
})

app.listen(port, () => {
  console.log('Listening on port ' + port)
})

module.exports = app
