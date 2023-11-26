const router = require('express').Router();
const swaggerUI = require('swagger-ui-express');

const swaggerDocument = require('../../docs/swagger.json');
const contentRouter = require('./contentRouter');

router.use('/api-docs', swaggerUI.serve);
router.use('/api-docs', swaggerUI.setup(swaggerDocument));

router.use('/api/v1/content', contentRouter);

module.exports = router;
