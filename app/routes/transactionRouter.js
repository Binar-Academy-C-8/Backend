const router = require('express').Router()

const Transaction = require('../controller/transactionController')

// router.post('/:courseId', Transaction.createTransaction)
router.post('/payment-callback', Transaction.paymentCallback)
router.post('/:courseId', Transaction.createTransactionSnap)
router.get('/:order_id', Transaction.getPaymentDetail)

module.exports = router
