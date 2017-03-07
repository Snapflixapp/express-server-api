'use strict'

// import Db from '../db'
// import crypto from 'crypto'
// import jwt from 'jsonwebtoken'
import {
  GraphQLObjectType,
  // GraphQLList,
  GraphQLString
  // GraphQLError
} from 'graphql'

const Auth = new GraphQLObjectType({
  name: 'Auth',
  description: 'User authentication token',
  fields: () => ({
    token: {type: GraphQLString},
    errors: {type: GraphQLString}
  })
})

// // TODO: This is a security hole... fix or remove.
// exports.getToken = (username) => {
//   return jwt.sign({
//     _id: crypto.randomBytes(16).toString('hex'),
//     username: username
//   }, process.env.JWT_SECRET, { expiresIn: '1h' })
// }
//
// exports.register = (username, password) => {
//   const passwordData = Db.models.user.generateHash(password)
//   return Db.models.user.findOrCreate({
//     where: {
//       username: username
//     },
//     defaults: {
//       password: passwordData.passwordHash,
//       salt: passwordData.salt
//     }
//   })
//   .spread((user, created) => {
//     if (!created) {
//       throw new Error('Username already taken.')
//     }
//     return user.signToken()
//   })
// }
//
// exports.login = (username, password) => {
//   return Db.models.user.findOne({where: {username: username}})
//     .then((user) => {
//       if (!user || !user.validPassword(password)) {
//         throw new Error('Invalid username or password')
//       }
//       return user.signToken()
//     })
// }

export default Auth
