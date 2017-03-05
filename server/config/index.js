// const config = require('./config.js').get(process.env.NODE_ENV);

const AWS = require('aws-sdk')

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'us-west-1'
})

const config = {
  production: {
    port: process.env.PORT || 3000,
    AWS: AWS,
    database: process.env.RDS_CONNECTION_URL
  },
  default: {
    port: process.env.PORT || 3000,
    AWS: AWS,
    database: 'postgres://localhost:5432/snapflix'
  }
}

exports.get = function get (env) {
  return config[env] || config.default
}
