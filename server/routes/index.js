const router = require('express').Router()

const user = require('../user')

router.use('/login', user.login)
router.use('/register', user.register)
router.use('/authenticate', user.authenticate)

module.exports = router
