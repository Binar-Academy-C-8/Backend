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
          'Gagal untuk memasukkan harga kursus premium, karena harga kursus dibawah 1000',
          400
        )
      )
    }

    if (req.body.courseType == 'Free' && req.body.isDiscount) {
      return next(
        new ApiError('Gagal memasukkan diskon, karena tipe kursus gratis', 400)
      )
    }
    console.log(req.body.courseDiscountInPercent)
    console.log(req.body.isDiscount)
    if (req.body.isDiscount && req.body.courseDiscountInPercent <= 0) {
      return next(
        new ApiError(
          'Gagal memasukkan diskon, diskon tidak boleh kurang dari 1%',
          400
        )
      )
    }

    if (!req.body.isDiscount && req.body.courseDiscountInPercent > 0) {
      return next(
        new ApiError(
          'Gagal memasukkan nilai diskon, karena kursus tidak diskon',
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
