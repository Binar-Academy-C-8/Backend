const router = require("express").Router();

const Auth = require("../controller/authController");
const Otp = require("../controller/verifyOtpConroller");
const authMe = require("../middlewares/authMe");

router.post("/member/register", Auth.register);
router.post("/member/login", Auth.login);
router.get("/me", authMe, Auth.authenticate);

router.post("/otp", Otp.verifyOTP);
router.post("/newOtp", Otp.sendOtp);

module.exports = router;