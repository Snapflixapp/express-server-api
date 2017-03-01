'use strict'

const neo4j = require('neo4j-driver').v1

// let driver = neo4j.driver(process.env.NEO4J_DEV, neo4j.auth.basic(process.env.NEO4J_USERNAME_DEV, process.env.NEO4J_PASSWORD_DEV))

if (process.env.NODE_ENV === 'production') {
  // driver = neo4j.driver(process.env.NEO4J_PROD, neo4j.auth.basic(process.env.NEO4J_USERNAME_PROD, process.env.NEO4J_PASSWORD_PROD))
}
exports.getSession = function (context) {
  if (context.neo4jSession) {
    // return context.neo4jSession
    return
  } else {
    return
    // context.neo4jSession = driver.session()
    // return context.neo4jSession
  }
}
