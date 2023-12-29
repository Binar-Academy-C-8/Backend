const router = require('express').Router();
const authMe = require('../middlewares/authMe');
const Notification = require('../controller/notificationController');

router.get('/', Notification.getAllNotification);
router.get('/user', authMe, Notification.getNotifByUserId);
router.get('/:notifId', authMe, Notification.getDetailNotif);

module.exports = router;
