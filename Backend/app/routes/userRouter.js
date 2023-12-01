const router = require('express').Router();

const User = require('../controller/userController');

router.patch('/update/:id', User.updateUser);
router.delete('/delete/:id', User.deleteUser);

module.exports = router;
