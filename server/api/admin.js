const isAdminMiddleware = (req, res, next) => {
  if (!req.user) {
    const err = new Error('Please sign up or log in')
    err.status = 401
    next(err)
  } else if (req.user.userType !== 'ADMIN') {
    const err = new Error('You are not authorized to perform this action')
    err.status = 401
    next(err)
  } else {
    next()
  }
}

module.exports = isAdminMiddleware
