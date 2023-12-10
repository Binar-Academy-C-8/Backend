const ApiError = require('../../utils/apiError')
const { Course } = require('../models')

const checkCourseId = async (req, res, next) => {
  try {
    const isCourseExist = await Course.findByPk(req.params.id)
    if (!isCourseExist) {
      next(
        new ApiError(`kursus dengan id ${req.params.id} tidak ditemukan`, 404)
      )
      return
    }
    next()
  } catch (err) {
    next(new ApiError('internal server error', 500))
  }
}

module.exports = checkCourseId
