const neo4j = require('neo4j-driver').v1

const driver = neo4j.driver('bolt://hobby-cnjaehapojekgbkeeekdoaol.dbs.graphenedb.com:24786', neo4j.auth.basic(process.env.NEO4J_USERNAME, process.env.NEO4J_PASSWORD))

exports.getSession = function (context) {
  if (context.neo4jSession) {
    return context.neo4jSession
  } else {
    context.neo4jSession = driver.session()
    return context.neo4jSession
  }
}
