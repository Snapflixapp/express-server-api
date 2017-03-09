import dotenv from 'dotenv'
dotenv.config()

import AWS from 'aws-sdk'

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'us-west-1'
})

const Config = (env) => {
  const config = {

    // Production config
    production: {
      port: process.env.PORT || 3000,
      AWS: AWS,
      database: {
        database: 'ebdb',
        host: process.env.RDS_HOSTNAME,
        username: process.env.RDS_USERNAME,
        password: process.env.RDS_PASSWORD,
        port: process.env.RDS_PORT,
        dialect: 'postgres'
      },
      auth: {
        secret: process.env.JWT_SECRET
      },
      baseUrl: 'https://snapflixapp.com'
    },

    // Staging config
    staging: {
      port: process.env.PORT || 3000,
      AWS: AWS,
      database: {
        database: 'ebdb',
        host: process.env.RDS_HOSTNAME,
        username: process.env.RDS_USERNAME,
        password: process.env.RDS_PASSWORD,
        port: process.env.RDS_PORT,
        dialect: 'postgres'
      },
      auth: {
        secret: process.env.JWT_SECRET
      },
      baseUrl: 'https://staging.snapflixapp.com'
    },

    // Default config
    default: {
      port: process.env.PORT || 3000,
      AWS: AWS,
      database: {
        url: 'postgres://db:5432/snapflix',
        dialect: 'postgres'
      },
      auth: {
        secret: process.env.JWT_SECRET
      },
      baseUrl: 'http://localhost:8080'
    }
  }

  return config[env] || config.default
}

export default new Config(process.env.NODE_ENV)
