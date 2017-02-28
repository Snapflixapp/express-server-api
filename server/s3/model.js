// const { get, isEmpty } = require('lodash')
const Video = require('../db/video')

exports.store = (session, userID, videoID, title) => {
  var query = [
    'MATCH (u:User {id: {userID}})',
    'CREATE (v:Video {id: {videoID}, title:{title}, processing: true })',
    'MERGE (u) -[:UPLOADED]-> (v)',
    'RETURN v'
  ].join('\n')

  return session.run(query, {userID: userID, videoID: videoID, title: title})
    .then(results => new Video(results.records[0].get('v')))
}
