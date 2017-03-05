const router = require('express').Router()
const { params, login, register } = require('./controller')
// const uuid = require('uuid')
// const jwt = require('jsonwebtoken')
// const { signToken } = require('./model')

router.post('/login', params, login)
router.post('/register', params, register)
// router.post('/faceSignIn', function (req, res, next) {
//   console.log('inside router faceSignIn===>', req.body)
//   const token = signToken(req.body)
//   res.send(token)
// })

module.exports = router
