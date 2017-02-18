
const express = require('express')
const app = express()

require('dotenv').config() // https://www.npmjs.com/package/dotenv

const port = process.env.PORT || 8080

require('./middleware/middleware')(app)

app.get('/', (req, res) => {
  res.status(200)
  res.send('Hello, World!')
})

app.listen(port, () => {
  console.log('Listening on port ' + port)
})

module.exports = app
