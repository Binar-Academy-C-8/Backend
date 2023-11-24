const router = require('express').Router();

const Chapter = require('../controller/chapterController');

router.post('/', Chapter.createChapter);
router.get('/', Chapter.findAllChapter);
router.get('/:id', Chapter.findChapter);
router.put('/:id', Chapter.updateChapter);
router.delete('/:id', Chapter.deleteChapter);

module.exports = router;
