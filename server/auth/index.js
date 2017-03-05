const router = require('express').Router()
const { params, login, register, faceAuth } = require('./controller')

router.post('/login', params, login)
router.post('/register', params, register)
router.post('/faceAuth', faceAuth)

module.exports = router
