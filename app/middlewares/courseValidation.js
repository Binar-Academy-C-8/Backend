const ApiError = require('../../utils/apiError')

const couseValidation = (req, res, next) => {
  try {
    if (req.body.courseType === 'free' && req.body.coursePrice !== 0) {
      return next(
        new ApiError(
          'gagal untuk memasukkan harga kursus karena tipe kursus adalah gratis',
          400
        )
      )
    }

    if (req.body.courseType === 'premium' && req.body.coursePrice <= 1000) {
      return next(
        new ApiError(
          'gagal untuk memasukkan harga kursus premium, karena harga kursus dibawah 1000',
          400
        )
      )
    }
  } catch (err) {
    next(new ApiError(err.message, 500))
  }
}

module.exports = couseValidation
