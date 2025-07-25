const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/uploadController.js');
const authMiddleware = require('../middleware/authMiddleware.js');

router.post('/upload', authMiddleware, uploadController.uploadExcel);
router.get('/upload/history', authMiddleware, uploadController.getUploadHistory);

module.exports = router;
