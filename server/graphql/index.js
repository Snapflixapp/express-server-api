const router = require('express').Router()
const graphqlHTTP = require('express-graphql')
const Schema = require('./schema')

router.use('/', graphqlHTTP({
  schema: Schema,
  graphiql: process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'staging'
}))

module.exports = router
