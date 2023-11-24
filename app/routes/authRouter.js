const router = require("express").Router();

const Auth = require("../controller/authController");
const authMe = require("../middlewares/authMe");

router.post("/member/register", Auth.register);
router.post("/member/login", Auth.login);
router.get("/me", authMe, Auth.authenticate);

module.exports = router;