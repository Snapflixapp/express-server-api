const router = require('express').Router()
const graphqlHTTP = require('express-graphql')
const Schema = require('./schema')

router.use('/', graphqlHTTP({
  schema: Schema,
  graphiql: true
}))

module.exports = router
