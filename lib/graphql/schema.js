import Query from './query'
import Mutation from './mutation'

import { GraphQLSchema } from 'graphql'

const Schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation
})

export default Schema
