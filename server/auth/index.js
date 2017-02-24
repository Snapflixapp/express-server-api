const router = require('express').Router()
const { params, login, register } = require('./controller')

router.post('/login', params, login)
router.post('/register', params, register)

module.exports = router
