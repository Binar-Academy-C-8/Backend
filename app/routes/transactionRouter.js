const router = require('express').Router()

const Transaction = require('../controller/transactionController')
const authMe = require('../middlewares/authMe')

router.post('/payment-callback', Transaction.paymentCallback)
router.post('/:courseId', authMe, Transaction.createTransactionSnap)
router.get('/', Transaction.getAllTransaction)
router.get('/:order_id', Transaction.getPaymentDetail)

module.exports = router
