const router = require('express').Router();

const Transaction = require('../controller/transactionController');

router.post("/:courseId", Transaction.createTransaction);

module.exports = router;