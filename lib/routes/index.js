import express from 'express'
// import auth from '../auth'
import graphql from '../graphql'

const router = express.Router()

// router.use('/', auth)
router.use('/graphql', graphql)

module.exports = router
