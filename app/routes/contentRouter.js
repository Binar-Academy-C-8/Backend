const router = require('express').Router();

const Content = require('../controller/contentController');

const upload = require('../middlewares/uploadVideoFile');
const checkContentBody = require('../middlewares/checkContentBody');

router.get('/', Content.getContent);
router.get('/:contentId', Content.getContentByid);

router.post(
  '/insert-bylink/:chapterId',
  checkContentBody,
  Content.insertContentByLink
);
router.post(
  '/insert-byfile/:chapterId',
  upload.single('video'),
  checkContentBody,
  Content.insertContentByFile
);

router.patch(
  '/update-byfile/:chapterId/:contentId',
  upload.single('video'),
  Content.updateContentByFile
);

router.patch(
  '/update-bylink/:chapterId/:contentId',
  Content.updateContentByLink
);

module.exports = router;
