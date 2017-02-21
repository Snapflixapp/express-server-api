'use strict'

const router = require('express').Router()

// const auth = require('../auth')
const users = require('../users')
// const videos = require('../videos')

// router.use('/authenticate', auth)

router.use('/register', users.register)
router.use('/login', users.login)
router.use('/me', users.me)

// router.use('/upload', videos.upload)

module.exports = router
