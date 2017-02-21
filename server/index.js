// https://www.npmjs.com/package/dotenv
require('dotenv').config()

const express = require('express')
const app = express()
const routes = require('./routes')

const port = process.env.PORT || 8080

require('./middleware/middleware')(app)

app.use(routes)

app.listen(port, () => {
  console.log('Listening on port ' + port)
})

module.exports = app
