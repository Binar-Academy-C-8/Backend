const router = require('express').Router();
const swaggerUI = require('swagger-ui-express');
const swaggerDocument = require('../../docs/swagger.json');
const courses = require('./courseRouter');

router.use('/api-docs', swaggerUI.serve);
router.use('/api-docs', swaggerUI.setup(swaggerDocument));
router.use('/api/v1/courses', courses);

module.exports = router;
