const router = require('express').Router()
const multer = require('../middlewares/multer')
const courseController = require('../controller/courseController')
const checkCourseId = require('../middlewares/checkCourseId')
const authMe = require('../middlewares/authMe')
const checkRole = require('../middlewares/checkRole')
const couseValidation = require('../middlewares/courseValidation')

router.get('/', courseController.getAllCourse)
router.post(
  '/create',
  authMe,
  checkRole(['admin']),
  couseValidation,
  multer.single('image'),
  courseController.createCourse
)
router.get('/:id', authMe, checkCourseId, courseController.getOneCourse)
router.patch(
  '/update/:id',
  authMe,
  checkRole(['admin']),
  checkCourseId,
  couseValidation,
  multer.single('image'),
  courseController.updateCourse
)
router.delete(
  '/delete/:id',
  authMe,
  checkRole(['admin']),
  checkCourseId,
  courseController.deleteCourse
)

module.exports = router
