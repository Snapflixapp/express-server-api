'use strict'

const neo4j = require('neo4j-driver').v1

let driver = neo4j.driver(process.env.NEO4J_DEV, neo4j.auth.basic(process.env.NEO4J_USERNAME, process.env.NEO4J_PASSWORD))

if (process.env.NODE_ENV === 'production') {
  driver = neo4j.driver(process.env.NEO4J_PRO, neo4j.auth.basic(process.env.NEO4J_USERNAME, process.env.NEO4J_PASSWORD))
}
exports.getSession = function (context) {
  if (context.neo4jSession) {
    return context.neo4jSession
  } else {
    context.neo4jSession = driver.session()
    return context.neo4jSession
  }
}
