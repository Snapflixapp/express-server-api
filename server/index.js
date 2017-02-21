// https://www.npmjs.com/package/dotenv
require('dotenv').config()

const express = require('express')
const app = express()
const jwt = require('express-jwt')
// const setAuthUser = require('./middleware/setAuthUser')
// const neo4jSessionCleanUp = require('./middleware/neo4jSessionCleanUp')
const routes = require('./router')

const port = process.env.PORT || 8080

require('./middleware/middleware')(app)

app.use(jwt({ secret: process.env.JWT_SECRET }).unless({ path: ['/authenticate', '/login', '/register', '/'] }))

// app.use(setAuthUser)
// app.use(neo4jSessionCleanUp)
app.use(routes)

app.listen(port, () => {
  console.log('Listening on port ' + port)
})

module.exports = app
