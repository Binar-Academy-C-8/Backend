const path = require('path')
const { Course } = require('../models')
const ApiError = require('../../utils/apiError')
const imagekit = require('../libs/imagekit')

const getAllCourse = async (req, res, next) => {
  try {
    const courses = await Course.findAll({
      include: ['Category'],
    })

    res.status(200).json({
      status: 'success',
      data: courses,
    })
  } catch (err) {
    next(new ApiError(err.message, 500))
  }
}

const getOneCourse = async (req, res, next) => {
  try {
    const course = await Course.findByPk(req.params.id, {
      include: ['Category'],
    })

    res.status(200).json({
      status: 'success',
      data: course,
    })
  } catch (err) {
    next(new ApiError(err.message, 500))
  }
}

const createCourse = async (req, res, next) => {
  const courseBody = req.body
  const file = req.file
  let image

  try {
    if (file) {
      const filename = file.originalname
      const extension = path.extname(filename)
      const uploadedImage = await imagekit.upload({
        file: file.buffer,
        fileName: `IMG-${Date.now()}.${extension}`,
      })
      image = uploadedImage.url
    }

    const newCourse = await Course.create({ ...courseBody, image })

    res.status(201).json({
      status: 'success',
      data: newCourse,
    })
  } catch (err) {
    next(new ApiError(err.message, 500))
  }
}

const updateCourse = async (req, res, next) => {
  const id = req.params.id
  const courseBody = req.body
  const file = req.file
  const condition = { where: { id }, returning: true }
  let image

  try {
    if (file) {
      const filename = file.originalname
      const extension = path.extname(filename)
      const uploadedImage = await imagekit.upload({
        file: file.buffer,
        fileName: `IMG-${Date.now()}.${extension}`,
      })
      image = uploadedImage.url
    }

    const updatedCourse = await Course.update(
      { ...courseBody, image },
      condition
    )

    res.status(200).json({
      status: 'success',
      message: `success update course with id ${id}`,
      data: updatedCourse[1],
    })
  } catch (err) {
    next(new ApiError(err.message, 500))
  }
}

const deleteCourse = async (req, res, next) => {
  const id = req.params.id
  const condition = { where: { id } }
  try {
    await Course.destroy(condition)

    res.status(201).json({
      status: 'success',
      message: `success delete course with id ${id}`,
    })
  } catch (err) {
    next(new ApiError(err.message, 500))
  }
}

module.exports = {
  getAllCourse,
  getOneCourse,
  createCourse,
  updateCourse,
  deleteCourse,
}
