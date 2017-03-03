const AWS = require('../server/config').get('development').aws
const dynamodb = new AWS.DynamoDB()
const docClient = new AWS.DynamoDB.DocumentClient()

const users = require('./usersData.json')
const videos = require('./videosData.json')
const comments = require('./commentsData.json')

createTable(users, 'users', 'username')
createTable(videos, 'videos', 'id')
createTable(comments, 'comments', 'id')

function createTable (json, fileName, key) {
  var tableParams = {
    TableName: 'snapflix-' + fileName + '-development',
    KeySchema: [
      {AttributeName: key, KeyType: 'HASH'}  // Partition key
    ],
    AttributeDefinitions: [
      {AttributeName: key, AttributeType: 'S'}
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 10,
      WriteCapacityUnits: 10
    }
  }

  dynamodb.createTable(tableParams, function (err, data) {
    if (err) {
      console.error('Unable to create ' + fileName + ' table. Error JSON:', JSON.stringify(err, null, 2))
      deleteTable(fileName)
    } else {
      console.log('Created ' + fileName + ' table. Table description JSON:', JSON.stringify(data, null, 2))
      importItems(json, fileName)
    }
  })
}

function importItems (items, fileName) {
  console.log('Importing ' + fileName + ' into DynamoDB. Please wait...')
  items.forEach(function (item) {
    const params = {
      TableName: 'snapflix-' + fileName + '-development',
      Item: item
    }

    docClient.put(params, function (err, response) {
      if (err) {
        console.error('Unable to add item to ' + fileName, '. Error JSON:', JSON.stringify(err, null, 2))
      } else {
        console.log('PutItem succeeded to ' + fileName + ' table.')
      }
    })
  })
}

function deleteTable (name) {
  const tableName = 'snapflix-' + name + '-development'
  dynamodb.deleteTable({TableName: tableName}, function (err, data) {
    if (err) {
      console.error('Unable to delete ' + name + ' table. Error JSON:', JSON.stringify(err, null, 2))
    } else {
      console.log('Deleted ' + name + 'table. Table description JSON:', JSON.stringify(data, null, 2))
    }
  })
}
