require('dotenv').config()
const AWS = require('aws-sdk')

AWS.config.update({
  region: 'us-west-1'
})

if (process.env.NODE_ENV === 'production') {
  AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    endpoint: ''
  })
} else if (process.env.NODE_ENV === 'staging') {
  AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    endpoint: ''
  })
} else {
  AWS.config.update({
    endpoint: 'http://localhost:8000'
  })
}

const config = {
  production: {
    port: process.env.PORT || 3000,
    project: 'snapflix',
    env: 'production',
    aws: AWS,
    baseUrl: 'https://snapflixapp.com'
  },
  staging: {
    port: process.env.PORT || 3000,
    project: 'snapflix',
    env: 'staging',
    aws: AWS,
    baseUrl: 'https://staging.snapflixapp.com'
  },
  default: {
    port: process.env.PORT || 3000,
    project: 'snapflix',
    env: 'development',
    aws: AWS,
    baseUrl: 'http://localhost:8080'
  }
}

exports.get = function get (env) {
  return config[env] || config.default
}
