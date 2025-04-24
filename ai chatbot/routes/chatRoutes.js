const express = require("express");
const router = express.Router();
const { extractToken } = require("../middleware/auth");
const { processMessage } = require("../controllers/chatController");

router.post("/", extractToken, processMessage);

module.exports = router;
