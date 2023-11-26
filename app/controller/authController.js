const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Auth, User, OTP } = require("../models");
const generatedOTP = require("../../utils/generatedOTP");
const { AUTH_EMAIL } = process.env;
const sendEmail = require("../../utils/sendEmail");

const ApiError = require("../../utils/apiError");
const scheduleOtpDeletion = require("../../utils/scheduleDeletion");

const register = async (req, res, next) => {
    try {
        const {
            name,
            email,
            password,
            phoneNumber,
            country,
            city,
        } = req.body;

        const existingUser = await User.findOne({
            where: {
                name,
            },
        });
        if (existingUser) {
            return next(new ApiError("Username already taken", 400));
        }

        const user = await Auth.findOne({
            where: {
                email,
            },
        });

        if (user) {
            return next(new ApiError("User email already taken", 400));
        }


        const passwordLength = password <= 8;
        if (passwordLength) {
            next(new ApiError("Minimum password must be 8 character", 400));
        }

        const saltRounds = 10;
        const hashedPassword = bcrypt.hashSync(
            password,
            saltRounds
        );

        const newUser = await User.create({
            name,
            email,
            phoneNumber,
            country,
            city,
        });
        const test = await Auth.create({
            email,
            password: hashedPassword,
            userId: newUser.id,
        });

        const newCode = await generatedOTP();
        const expirationTime = new Date();
        const expirationInMinutes = 3;
        expirationTime.setMinutes(expirationTime.getMinutes() + expirationInMinutes);
        const expirationInMinutesSinceNow = Math.floor((expirationTime - new Date()) / (1000 * 60));

        const hasheOtpCode = bcrypt.hashSync(
            newCode,
            saltRounds
        );

        const newOTP = await OTP.create({
            email,
            code: hasheOtpCode,
            userId: newUser.id,
            expiredAt: expirationInMinutesSinceNow,
        });

        const deletionDelay = expirationInMinutesSinceNow * 60 * 1000;
        scheduleOtpDeletion(newOTP.id, deletionDelay);

        const mailOptions = {
            from: AUTH_EMAIL,
            to: email,
            subject: `OTP from ${AUTH_EMAIL}`,
            html: `
                <p>Hello,</p>
                <p>Your OTP is:</p>
                <p style="color:black;font-size:25px;letter-spacing:2px;"><strong>${newCode}</strong></p>
                <p>It will expire in ${newOTP.expiredAt} minutes.</p>
                <p>Best regards,</p>
                <p>Team c8</p>
            `,
        };
        await sendEmail(mailOptions);

        res.status(201).json({
            status: "Success",
            data: {
                ...newUser,
                email,
                password: hashedPassword,
                newOTP
            },
        });
    } catch (err) {
        next(new ApiError(err.message, 500));
    }
};

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await Auth.findOne({
            where: {
                email,
            },
            include: ["User"]
        });

        if (!user) {
            return next(new ApiError("Email not found", 404));
        }

        if (user && bcrypt.compareSync(password, user.password)) {
            const token = jwt.sign(
                {
                    id: user.userId,
                    username: user.User.name,
                    role: user.User.role,
                    email: user.email,
                },
                process.env.JWT_SECRET
            );

            res.status(200).json({
                status: "Success",
                message: "Login Successfully",
                data: token,
            });
        } else {
            return next(new ApiError("Incorrect password", 401));
        }

    } catch (err) {
        next(new ApiError(err.message, 500));
    }
};

const authenticate = async (req, res) => {
    try {
        res.status(200).json({
            status: "Success",
            data: {
                user: req.user,
            },
        });
    } catch (err) {
        next(new ApiError(err.message, 500));
    }
};

module.exports = { register, login, authenticate };