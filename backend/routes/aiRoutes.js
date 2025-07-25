const express = require("express");
const router = express.Router();
const aiController = require("../controllers/aiController.js");

router.post("/ai/insights", aiController.generateInsights);

module.exports = router;
