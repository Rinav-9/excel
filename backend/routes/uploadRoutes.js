const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/uploadController.js');
const authMiddleware = require('../middleware/authMiddleware.js');

router.post('/', authMiddleware, uploadController.uploadExcel);
router.get('/history', authMiddleware, uploadController.getUploadHistory);

module.exports = router;
