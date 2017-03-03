const router = require('express').Router()

const s3 = require('../s3')
const auth = require('../auth')
const videos = require('../videos')
const graphql = require('../graphql')

router.use('/s3', s3)
router.use('/auth', auth)
router.use('/videos', videos)
router.use('/graphql', graphql)

module.exports = router
