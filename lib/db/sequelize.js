import config from '../config'
import Sequelize from 'sequelize'

const Conn = new Sequelize(config.database)

Conn.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.')
  })
  .catch((err) => {
    console.log('!!!!!!!!!!!!!!!!!!!!!!!!')
    console.log('Database: ', config.database.database)
    console.log('Host: ', config.database.host)
    console.log('Username: ', config.database.username)
    console.log('Password: ', config.database.password)
    console.log('Port: ', config.database.port)
    console.log('Dialect: ', config.database.dialect)
    console.log('Unable to connect to the database:', err)
  })

export default Conn
