const express = require('express')
const app = express()

const port = 8080

require('./middleware/middleware')(app)

app.get('/', (req, res) => {
  res.send('Hello, World!')
})

app.listen(port, () => {
  console.log('Listening on port ' + port)
})
