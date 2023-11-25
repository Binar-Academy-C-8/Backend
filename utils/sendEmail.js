const expressAsyncHandler = require("express-async-handler");
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");
const generateOTP = require("./generatedOTP");
const { OTP } = require("../app/models");
const { verify } = require("jsonwebtoken");
dotenv.config();
const { AUTH_EMAIL, AUTH_PASSWORD } = process.env;

let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
        user: AUTH_EMAIL,
        pass: AUTH_PASSWORD,
    },
});

// transporter.verify((error, success) => {
//     if (error) {
//         console.log(error);
//     } else {
//         console.log("Ready");
//         console.log(success);
//     }
// });

const sendEmail = async (mailOptions) => {
    try {
        await transporter.sendMail(mailOptions);
        return;
    } catch (err) {
        throw err;
    }
};

module.exports = sendEmail;
