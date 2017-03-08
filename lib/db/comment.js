import Conn from './sequelize'
import Sequelize from 'sequelize'

const Comment = Conn.define('comment', {
  content: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

export default Comment
