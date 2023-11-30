const router = require('express').Router()
const multer = require('../middlewares/multer')
const courseController = require('../controller/courseController')
const checkCourseId = require('../middlewares/checkCourseId')

router.get('/', courseController.getAllCourse)
router.post('/create', multer.single('image'), courseController.createCourse)
router.get('/:id', checkCourseId, courseController.getOneCourse)
router.patch(
  '/update/:id',
  checkCourseId,
  multer.single('image'),
  courseController.updateCourse
)
router.delete('/delete/:id', checkCourseId, courseController.deleteCourse)

module.exports = router
