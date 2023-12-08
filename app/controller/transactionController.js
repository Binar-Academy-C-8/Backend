const Midtrans = require('midtrans-client')
const { Transaction, Course, Auth } = require('../models')
const { CLIENT_KEY, SERVER_KEY, PUBLIC_API } = process.env
const ApiError = require('../../utils/apiError')
const axios = require('axios')
const crypto = require('crypto')
const mathRandom = require('../../utils/generatedOTP')

const createTransactionSnap = async (req, res, next) => {
  try {
    const { courseId } = req.params

    const course = await Course.findByPk(courseId)
    const authData = await Auth.findOne({
      where: {
        userId: req.user.id,
      },
      include: ['User'],
    })

    const quantity = 1

    let snap = new Midtrans.Snap({
      isProduction: false,
      serverKey: SERVER_KEY,
      clientKey: CLIENT_KEY,
    })

    const random = await mathRandom()

    let data = {
      item_details: [
        {
          id: course.id,
          name: course.courseName,
          price: course.coursePrice,
          quantity,
        },
      ],
      transaction_details: {
        order_id: random,
        gross_amount: course.coursePrice * quantity,
      },
      customer_details: {
        first_name: authData.User.name,
        email: authData.email,
        phone: authData.User.phoneNumber,
      },
    }

    const transaction = await snap.createTransaction(data)

    const createdTransactionData = await Transaction.create({
      courseName: course.courseName,
      userId: authData.id,
      courseId: course.id,
      totalPrice: course.coursePrice,
      orderId: data.transaction_details.order_id,
    })

    res.status(201).json({
      status: 'success',
      url: transaction.redirect_url,
      token: transaction.token,
      email: authData.email,
      createdTransactionData,
      data,
    })
  } catch (err) {
    next(new ApiError(`Gagal membuat pembayaran: ${err.message}`, 500))
  }
}

const paymentCallback = async (req, res, next) => {
  try {
    const {
      order_id,
      status_code,
      gross_amount,
      transaction_status,
      signature_key,
    } = req.body

    const serverKey = SERVER_KEY

    const hashed = crypto
      .createHash('sha512')
      .update(order_id + status_code + gross_amount + serverKey)
      .digest('hex')

    console.log(`hashed = ${hashed}`)
    console.log(`signatur key = ${signature_key}`)

    if (hashed === signature_key) {
      if (
        transaction_status == 'settlement' ||
        transaction_status == 'capture'
      ) {
        const payment = await Transaction.findOne({
          where: { orderId: order_id },
        })
        if (!payment) return next(new ApiError('Transaksi tidak ada', 404))

        await payment.update({ paymentStatus: 'paid' })
      }
    }

    res.status(200).json({
      message: 'success',
    })
  } catch (err) {
    next(new ApiError(`Gagal membuat pembayaran: ${err.message}`, 500))
  }
}

const getAllTransaction = async (req, res, next) => {
  try {
    const transactions = await Transaction.findAll()
    res.status(200).json({
      status: 'Success',
      data: {
        transactions,
      },
    })
  } catch (err) {
    next(new ApiError(err.message, 500))
  }
}

const getPaymentDetail = async (req, res, next) => {
  try {
    const { order_id } = req.params
    const detailTransaction = await Transaction.findOne({ orderId: order_id })
    res.status(200).json({
      detailTransaction,
    })
  } catch (err) {
    next(new ApiError(`Gagal membuat pembayaran: ${err.message}`, 500))
  }
}

module.exports = {
  createTransactionSnap,
  paymentCallback,
  getAllTransaction,
  getPaymentDetail,
}
