const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController.js");
const authMiddleware = require("../middleware/authMiddleware.js");

router.post("api/auth/signup", authController.register);
router.post("api/auth/login", authController.login);
router.get("api/auth/profile", authMiddleware, authController.profile);
router.put("api/auth/profile", authMiddleware, authController.updateProfile);
router.post("api/auth/logout", authController.logout);

router.post("api/auth/forgot-password", authController.forgotPassword);
router.post("api/auth/verify-otp", authController.verifyOtp);
router.post("api/auth/reset-password", authController.resetPassword);

module.exports = router;
