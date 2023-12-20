const router = require('express').Router()
const authMe = require('../middlewares/authMe')
const checkRole = require('../middlewares/checkRole')
const Notification = require('../controller/notificationController')

router.get(
  '/getAllNotif',
  authMe,
  checkRole(['admin']),
  Notification.getAllNotification
)
router.get('/getNotifByUserId/:userId', authMe, Notification.getNotifByUserId)
router.get(
  '/getDetailNotif/:userId/:notifId',
  authMe,
  Notification.getDetailNotif
)
router.get('/getRead', Notification.getRead)

module.exports = router
