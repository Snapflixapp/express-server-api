// 'use strict'
//
// const db = require('../db')
// const { me } = require('./model')
// const { writeResponse, writeError } = require('../utils')
//
// exports.authenticate = (req, res, next) => {
//   let user = req.user
//
//   if (!user) {
//     return writeError(res, {detail: req}, 400)
//   }
//
//   me(db.getSession(req), user._id)
//     .then((user) => {
//       writeResponse(res, {
//         user: {
//           _id: user.id,
//           username: user.username
//         }
//       }, 200)
//     })
//     .catch(next)
// }
