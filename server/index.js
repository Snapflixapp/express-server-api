'use strict'

const express = require('express')

// Constants
const PORT = 3000

// App
const app = express()
app.get('/', function (req, res) {
  res.send('Hello world\n')
})

app.listen(PORT)
console.log('Running on http://localhost:' + PORT)

// // https://www.npmjs.com/package/dotenv
// require('dotenv').config()
//
// const express = require('express')
// const app = express()
// // const routes = require('./routes')
// // const writeError = require('./helpers').writeError
//
// const port = process.env.PORT || 8080
//
// require('./middleware/middleware')(app)
//
// app.get('/', function (req, res) {
//   res.send('Hello, World!')
// })
//
// // app.use(routes)
//
// // app.use(function (err, req, res, next) {
// //   if (err && err.status) {
// //     writeError(res, err)
// //   } else {
// //     next(err)
// //   }
// // })
//
// app.listen(port, () => {
//   console.log('Listening on port ' + port)
// })

module.exports = app
