const express = require('express')
const app = express()

const port = process.env.PORT || 8080

require('./middleware/middleware')(app)

app.get('/', (req, res) => {
  res.send('Hello, Amazon Elastic Beanstalk!')
})

app.listen(port, () => {
  console.log('Listening on port ' + port)
})
