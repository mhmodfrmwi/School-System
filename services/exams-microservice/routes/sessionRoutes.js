const express = require("express");
const router = express.Router();
const { startSession } = require("../controllers/sessionController");

router.post("/sessions", startSession);

module.exports = router;
