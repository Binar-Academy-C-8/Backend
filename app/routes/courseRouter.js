const router = require('express').Router();
const multer = require('../middlewares/multer');
const courseController = require('../controller/courseController');
const checkCourseId = require('../middlewares/checkCourseId');

router
  .route('/')
  .get(courseController.getAllCourse)
  .post(multer.single('image'), courseController.createCourse);
router
  .route('/:id')
  .get(checkCourseId, courseController.getOneCourse)
  .patch(checkCourseId, multer.single('image'), courseController.updateCourse)
  .delete(checkCourseId, courseController.deleteCourse);

module.exports = router;
