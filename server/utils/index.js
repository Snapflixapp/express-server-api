'use strict'

const baseUrl = process.env.NODE_ENV === 'production' ? 'https://staging.snapflixapp.com' : 'http://localhost:8080'

exports.writeResponse = (res, response, status) => {
  res.status(status || 200).json(response)
}

exports.writeError = (res, err, status) => {
  if (err.name === 'UnauthorizedError') {
    res.redirect(401, baseUrl + '/signin')
  } else {
    res.status(err.status || status || 400).json(err.toString())
  }
}
