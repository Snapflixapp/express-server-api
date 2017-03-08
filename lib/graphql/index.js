import express from 'express'
import graphqlHTTP from 'express-graphql'
import Schema from './schema'
import { getTokenFromRequest } from '../utils/auth'

const router = express.Router()

router.use('/', graphqlHTTP(request => ({
  schema: Schema,
  graphiql: process.env.NODE_ENV !== 'production',
  context: getTokenFromRequest(request)
})))

module.exports = router
