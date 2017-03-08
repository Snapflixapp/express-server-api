import Conn from './sequelize'
import Sequelize from 'sequelize'

const Video = Conn.define('video', {
  title: Sequelize.STRING,
  contentType: Sequelize.STRING,
  key: Sequelize.STRING,
  url: Sequelize.STRING
})

export default Video
