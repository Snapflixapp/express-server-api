const router = require('express').Router()

const users = require('./users')

router.use('/register', users.register)
router.use('/login', users.login)
router.use('/me', users.me)

module.exports = router
