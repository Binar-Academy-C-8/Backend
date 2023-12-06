const Midtrans = require("midtrans-client");
const { Transaction, Course } = require('../models');
const { CLIENT_KEY, SERVER_KEY } = process.env;
const ApiError = require('../../utils/apiError');

const createTransaction = async (req, res, next) => {
  const { courseId } = req.params;
  const { totalPrice } = req.body;

  const course = await Course.findByPk(courseId);
  console.log(course);

  try {
    const createdTransactionData = await Transaction.create({
      courseName: course.courseName,
      courseId,
      totalPrice,
    });

    const quantity = 1;

    // Menginisialisasi objek Midtrans Snap
    let snap = new Midtrans.Snap({
      isProduction: false,
      serverKey: SERVER_KEY,
      clientKey: CLIENT_KEY,
    });

    // Membuat transaksi Midtrans
    const transaction = await snap.createTransaction({
      item_details: [
        {
          id: createdTransactionData.courseId,
          name: createdTransactionData.courseName,
          price: createdTransactionData.totalPrice,
          quantity,
        }
      ],
      transaction_details: {
        order_id: createdTransactionData.courseId,
        gross_amount: createdTransactionData.totalPrice * quantity,
      },
      // customer_details: {
      //   first_name: createdTransactionData.courseName
      // }
    });

    // Mengembalikan response dengan status 201 dan data transaksi
    // const dataTransaction = {
    //   response: JSON.stringify(transaction),
    // };
    res.status(201).json({
      status: 'success',
      url: transaction.redirect_url,
      token: transaction.token,
      course
    });
  } catch (err) {
    next(new ApiError(err.message));
  }
};

export const paymentCallback = async (req, res, next) => {
  const { order_id, status_code, gross_amount, signature_key, transaction_status } = req.body;

  try {
    const serverKey = SERVER_KEY;
    const hashed = crypto
      .createHash("sha512")
      .update(order_id + status_code + gross_amount + serverKey)
      .digest("hex");

    if (hashed === signature_key) {
      if (transaction_status === "settlement") {
        const transaction = await Transaction.findOne({ courseId: order_id });
        if (!transaction) return next(new ApiError("Transaksi tidak ada", 404));

        // Update status transaksi sesuai dengan data callback
        transaction.status = "paid";
        await transaction.save();
      }
    }

    res.status(200).json({
      message: "success",
    });
  } catch (error) {
    next(new ApiError("Failed to process payment callback", 500));
  }
};

module.exports = { createTransaction };
