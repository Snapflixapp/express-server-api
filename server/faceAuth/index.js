const uuid = require('uuid')
const jwt = require('jsonwebtoken')

exports.faceAuth = (req, res, next) => {
  console.log("I'm from faceauth ", req.body)
  const token = jwt.sign({
    _id: uuid.v4(),
    username: req.body.username
  }, process.env.JWT_SECRET, { expiresIn: '1h' })
  res.status(200).json({
    token: token
  })
}
