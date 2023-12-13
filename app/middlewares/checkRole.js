const ApiError = require('../../utils/apiError')

const checkRole = (roles) => {
  return async (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ApiError(
          `Anda bukan ${roles.toString()}, sehingga Anda tidak memiliki akses.`,
          401
        )
      )
    }
    next()
  }
}

module.exports = checkRole
