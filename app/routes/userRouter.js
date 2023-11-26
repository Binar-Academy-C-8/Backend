const router = require('express').Router();

const User = require('../controller/userController');

router.patch('/update/:id', User.updateUser);

module.exports = router;
