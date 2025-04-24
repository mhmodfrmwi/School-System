const express = require("express");
const router = express.Router();
const { extractToken } = require("../middleware/auth");
const {
  getSchedule,
  getTodaySchedule,
  getDaySchedule,
} = require("../controllers/scheduleController");

router.get("/", extractToken, getSchedule);

router.get("/today", extractToken, getTodaySchedule);

router.get("/day/:day", extractToken, getDaySchedule);

module.exports = router;
