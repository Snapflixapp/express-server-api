import express from 'express'
import { params, login, register, faceAuth } from './controller'

const router = express.Router()

router.post('/login', params, login)
router.post('/register', params, register)
router.post('/faceAuth', faceAuth)

module.exports = router
