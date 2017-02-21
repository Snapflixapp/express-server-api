const router = require('express').Router()

const users = require('./users')

router.use('/login', users.login)
router.use('/register', users.register)
router.use('/authenticate', users.authenticate)

module.exports = router
