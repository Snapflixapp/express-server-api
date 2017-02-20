const express = require('express')
const db = require('./db')
const setAuthUser = require('./middleware/setAuthUser')
const neo4jSessionCleanUp = require('./middleware/neo4jSessionCleanUp')
const app = express()

require('dotenv').config() // https://www.npmjs.com/package/dotenv
const routes = require('./router')

const port = process.env.PORT || 8080

require('./middleware/middleware')(app)

app.use(setAuthUser)
app.use(neo4jSessionCleanUp)
app.use(routes)

app.listen(port, () => {
  console.log('Listening on port ' + port)
})

module.exports = app
