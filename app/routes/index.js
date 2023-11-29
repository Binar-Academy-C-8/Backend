const router = require('express').Router()
const swaggerUI = require('swagger-ui-express')
const swaggerDocument = require('../../docs/swagger.json')

router.use('/api-docs', swaggerUI.serve)
router.use('/api-docs', swaggerUI.setup(swaggerDocument))
const Welcome = require('./welcomeRouter')
const Auth = require('./authRouter')
const User = require('./userRouter')
const Chapter = require('./chapterRouter.js')

router.use('/welcome', Welcome)
router.use('/api/v1/auth', Auth)
router.use('/api/v1/user', User)
router.use('/api/v1/chapter', Chapter)

module.exports = router
