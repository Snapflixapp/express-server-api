const router = require('express').Router()

const s3 = require('../s3')
const auth = require('../auth')
const videos = require('../videos')

router.use('/s3', s3)
router.use('/auth', auth)
router.use('/videos', videos)

module.exports = router
