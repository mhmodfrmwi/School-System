const express = require("express");
const router = express.Router();
const attendanceController = require("../controllers/attendanceController");
const { extractToken } = require("../middleware/auth");
router.get("/", extractToken, attendanceController.getAttendance);
module.exports = router;
