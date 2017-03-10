import config from '../config'
import Sequelize from 'sequelize'

const Conn = new Sequelize(config.database)

Conn.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.')
  })
  .catch((err) => {
    console.log('Unable to connect to the database:', err)
  })

export default Conn
