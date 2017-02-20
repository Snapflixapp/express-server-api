'use strict'

const router = require('express').Router()
const user = require('userController')

router.route('/:user')
  .get(user.get)

module.exports = router
