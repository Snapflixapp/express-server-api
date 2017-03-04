const router = require('express').Router()

const auth = require('../auth')
const graphql = require('../graphql')

router.use('/', auth)
router.use('/graphql', graphql)

module.exports = router
