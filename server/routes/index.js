const router = require('express').Router()

const s3 = require('../s3')
const auth = require('../auth')
const videos = require('../videos')
// const faceAuth = require('../faceAuth')

router.use('/s3', s3)
router.use('/auth', auth)
router.use('/videos', videos)
// router.use('/faceAuth', () => {
//   console.log("TOKEN")
//   faceAuth })

module.exports = router
