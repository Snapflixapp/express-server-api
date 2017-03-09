import express from 'express'
import graphql from '../graphql'

const router = express.Router()

router.use('/graphql', graphql)

module.exports = router
