const router = require('express').Router();

const User = require('../controller/userController');

router.patch('/:id', User.updateUser);
router.delete('/:id', User.deleteUser);

module.exports = router;
