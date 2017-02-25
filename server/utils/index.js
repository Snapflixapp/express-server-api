'use strict'

exports.writeResponse = (res, response, status) => {
  res.status(status || 200).json(response)
}

exports.writeError = (res, err, status) => {
  if (err.name === 'UnauthorizedError') {
    if (process.env.NODE_ENV === 'production') {
      res.redirect(303, 'https://snapflixapp.com/signin')
    } else {
      res.redirect(303, 'https://staging.snapflixapp.com/signin')
    }
  } else {
    res.status(err.status || status || 400).json(err.toString())
  }
}
