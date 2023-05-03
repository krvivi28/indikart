const express = require("express");
const {
  registerUser,
  getUser,
  loginUser,
  logOut,
  forgotPassword,
} = require("../controllers/userController");
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/password/forget").post(forgotPassword);
router.route("/logout").get(logOut);

module.exports = router;
