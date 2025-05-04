const express = require("express");
const router = express.Router();
const { extractToken } = require("../middleware/auth");
const { processMessage } = require("../controllers/chatController");

router.options("/", (req, res) => {
  res.sendStatus(200);
});

router.post("/", extractToken, processMessage);

module.exports = router;
