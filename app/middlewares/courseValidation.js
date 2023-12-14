const ApiError = require('../../utils/apiError')

const couseValidation = (req, res, next) => {
  try {
    if (req.body.courseType === 'Free' && req.body.coursePrice !== 0) {
      return next(
        new ApiError(
          'gagal untuk memasukkan harga kursus karena tipe kursus adalah gratis',
          400
        )
      )
    }

    if (req.body.courseType === 'Premium' && req.body.coursePrice <= 1000) {
      return next(
        new ApiError(
          'gagal untuk memasukkan harga kursus premium, karena harga kursus dibawah 1000',
          400
        )
      )
    }
    next()
  } catch (err) {
    next(new ApiError(err.message, 500))
  }
}

module.exports = couseValidation
