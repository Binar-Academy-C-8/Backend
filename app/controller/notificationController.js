const ApiError = require('../../utils/apiError')
const {
  Course,
  User,
  Notification,
  CourseUser,
  NotificationRead,
} = require('../models')
const { Op } = require('sequelize')
require('dotenv').config()

const getAllNotification = async (req, res, next) => {
  try {
    const notification = await Notification.findAll({
      include: [
        'User',
        'Course',
        'CourseUser',
        {
          model: NotificationRead,
          as: 'notificationRead',
        },
      ],
      order: [['createdAt', 'DESC']],
    })

    res.status(200).json({
      status: 'Success',
      message: 'Sukses menampilkan data',
      notification,
    })
  } catch (err) {
    next(new ApiError(err.message, 500))
  }
}

const getNotifByUserId = async (req, res, next) => {
  try {
    const userId = req.user.id

    const notification = await Notification.findAll({
      where: {
        [Op.or]: [
          {
            userId,
          },
          { userId: null },
        ],
      },
      order: [['createdAt', 'DESC']],
      include: [
        'User',
        'Course',
        'CourseUser',
        {
          model: NotificationRead,
          as: 'notificationRead',
        },
      ],
    })
    return res.status(200).json({
      status: 'Success',
      message: 'Sukses menampilkan data notifikasi by user id',
      notification,
    })
  } catch (err) {
    next(new ApiError(err.message, 500))
  }
}
const getDetailNotif = async (req, res, next) => {
  try {
    const userId = req.user.id
    const notifId = req.params.notifId

    const notification = await Notification.findOne({
      where: {
        [Op.or]: [
          {
            userId: userId,
          },
          { userId: null },
        ],
        id: notifId,
      },
      order: [['createdAt', 'DESC']],
      include: ['User', 'Course', 'CourseUser'],
    })

    if (!notification)
      return next(new ApiError('Data notifikasi tidak ditemukan', 404))

    const notificationRead = await NotificationRead.update(
      {
        isRead: true,
      },
      {
        where: {
          notifId: notifId,
        },
        returning: true,
      }
    )

    res.status(200).json({
      status: 'Success',
      message: 'Sukses menampilkan data by notifikasi id',
      data: {
        notification,
        notificationRead: notificationRead[1][0],
      },
    })
  } catch (err) {
    next(new ApiError(err.message, 500))
  }
}

const getRead = async (req, res, next) => {
  try {
    const read = await NotificationRead.findAll()

    res.status(200).json({
      status: 'Success',
      message: 'Sukses menampilkan data notifikasi read',
      read,
    })
  } catch (err) {
    next(new ApiError(err.message, 500))
  }
}

module.exports = {
  getAllNotification,
  getNotifByUserId,
  getDetailNotif,
  getRead,
}
