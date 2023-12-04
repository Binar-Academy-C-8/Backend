const router = require('express').Router();

const User = require('../controller/userController');

router.get('/', User.getUsers);
router.patch('/:id', User.updateUser);
router.delete('/:id', User.deleteUser);

module.exports = router;
