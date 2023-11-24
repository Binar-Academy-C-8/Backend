const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Auth, User } = require("../models");

const ApiError = require("../../utils/apiError");

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

        console.log(test);

        res.status(201).json({
            status: "Success",
            data: {
                ...newUser,
                email,
                password: hashedPassword,
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