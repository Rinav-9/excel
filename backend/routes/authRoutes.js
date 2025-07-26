const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController.js");
const authMiddleware = require("../middleware/authMiddleware.js");

router.post("/auth/signup", authController.register);
router.post("/https://excelanalytics-ciws.onrender.com/api/auth/login", authController.login);
router.get("/auth/profile", authMiddleware, authController.profile);
router.put("/auth/profile", authMiddleware, authController.updateProfile);
router.post("/auth/logout", authController.logout);

router.post("/auth/forgot-password", authController.forgotPassword);
router.post("/auth/verify-otp", authController.verifyOtp);
router.post("/auth/reset-password", authController.resetPassword);

module.exports = router;
