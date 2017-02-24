const router = require('express').Router()
const { sign } = require('./controller')

router.get('/sign', sign)

module.exports = router
