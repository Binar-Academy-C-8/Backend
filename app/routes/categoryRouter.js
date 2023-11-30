const router = require('express').Router();
const multer = require('../middlewares/multer');
const category = require('../controller/categoryController');
const checkCategoryId = require('../middlewares/checkCategoryId');
const checkRole = require('../middlewares/checkRole');
const authenticate = require('../middlewares/authMe');

router.get('/', category.getAllCategory);
router.post(
    '/create',
    authenticate,
    checkRole(["admin"]),
    multer.single('image'),
    category.createCategory);
router.get(
    '/:id',
    checkCategoryId,
    category.getOneCategory);
router.patch(
    '/update/:id',
    authenticate,
    checkRole(["admin"]),
    checkCategoryId,
    multer.single('image'),
    category.updateCategory
);
router.delete(
    '/delete/:id',
    authenticate,
    checkRole(["admin"]),
    checkCategoryId,
    category.deleteCategory
);

module.exports = router;