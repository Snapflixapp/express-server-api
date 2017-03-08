import bodyParser from 'body-parser'
import morgan from 'morgan'
import cors from 'cors'

module.exports = (app) => {
  app.use('*', cors())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())
  app.use(morgan('dev'))
}
