const express = require("express");
const { createMateriel } = require("../controllers/Teacher/materialController");
const {
  createStudentAttendance,
} = require("../controllers/Student/attendanceController");
const router = express.Router();

router.post("/material", createMateriel);
router.post("/createAttendance", createStudentAttendance);
module.exports = router;
