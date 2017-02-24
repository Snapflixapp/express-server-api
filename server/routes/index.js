const router = require('express').Router()

const auth = require('../auth')
const s3 = require('../s3')

router.use('/auth', auth)
router.use('/s3', s3)

module.exports = router
