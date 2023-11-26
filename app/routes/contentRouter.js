const router = require('express').Router();

const Content = require('../controller/contentController');

const upload = require('../middlewares/uploadVideoFile');

router.get('/', Content.getContent);
router.get('/:id', Content.getContentByid);

router.post('/insert-bylink/:id', Content.insertContentByLink);
router.post(
  '/insert-byFile/:id',
  upload.single('video'),
  Content.insertContentByFile
);

module.exports = router;
