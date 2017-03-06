import express from 'express'
import graphqlHTTP from 'express-graphql'
import Schema from './schema'

const router = express.Router()

router.use('/', graphqlHTTP({
  schema: Schema,
  graphiql: process.env.NODE_ENV !== 'production'
}))

module.exports = router
