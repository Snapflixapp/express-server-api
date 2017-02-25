'use strict'

exports.writeResponse = (res, response, status) => {
  res.status(status || 200).json(response)
}

exports.writeError = (res, error, status) => {
  if (error.name === 'UnauthorizedError') {
    res.redirect(303, 'https://staging.snapflixapp.com/signin') // TODO: staging vs. prod
  } else {
    res.status(400).send(error)
  }
}
