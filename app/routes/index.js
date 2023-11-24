const router = require('express').Router();
const swaggerUI = require('swagger-ui-express');
const swaggerDocument = require('../../docs/swagger.json');

// router file
const Chapter = require('./chapterRouter.js');

router.use('/api-docs', swaggerUI.serve);
router.use('/api-docs', swaggerUI.setup(swaggerDocument));

router.use('/api/v1/chapters', Chapter);

module.exports = router;
