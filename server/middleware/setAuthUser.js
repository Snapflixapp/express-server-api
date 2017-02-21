// 'use strict'
//
// // TODO
// const Users = require('./users')
// const db = require('./db')
//
// module.exports = (req, res, next) => {
//   let authHeader = req.headers['authorization']
//   if (!authHeader) {
//     req.user = {id: null}
//     next()
//   } else {
//     let match = authHeader.match(/^Token (\S+)/)
//     if (!match || !match[1]) {
//       // TODO
//       return
//     }
//     let token = match[1]
//
//     Users.getUser(db.getSession(req), token)
//       .then(user => {
//         req.user = user
//         next()
//       })
//       .catch((err) => {
//         console.log(err)
//       })
//   }
// }
