'use strict'

exports.writeResponse = (res, response, status) => {
  res.status(status || 200).json(response)
}

exports.writeError = (res, error, status) => {
  if (error.name === 'UnauthorizedError') {
    const signin = process.env.NODE_ENV === 'production'
    ? 'https://snapflixapp.com/signin' : 'https://staging.snapflixapp.com/signin'
    res.redirect(303, signin)
  } else {
    res.status(400).send(error)
  }
}
