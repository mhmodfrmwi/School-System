const express = require("express");
const { login } = require("../controllers/auth/authStudentController");
const validateJwt = require("../middlewares/validateJWT");
const getSubjectsAcademicYearAndGradeAndSemester = require("../controllers/Student/subjectsController");
const {
  getMaterielForSpecificSubjectUsingGradeAndSemesterAndAcademicYear,
} = require("../controllers/Student/materialController");
const {
  getQuestionsBySubjectForStudent,
} = require("../controllers/Student/questionBankController");
const { getAllTrips } = require("../controllers/Student/tripController");
const { getAllContests } = require("../controllers/manager/contestController");
const {
  getStudentAttendanceUsingStudentId,
} = require("../controllers/Student/attendanceController");
const {
  getScheduleForSpecificStudent,
} = require("../controllers/Student/scheduleController");

const router = express.Router();

//login route
router.route("/login").post(login);

//features routes
router.get(
  "/get-subjects",
  validateJwt,
  getSubjectsAcademicYearAndGradeAndSemester
);

router.get(
  "/materiel/:id",
  validateJwt,
  getMaterielForSpecificSubjectUsingGradeAndSemesterAndAcademicYear
);

router.get(
  "/questionBank/:gradeSubjectSemesterId",
  validateJwt,
  getQuestionsBySubjectForStudent
);
router.get("/trip", getAllTrips);
router.get("/contest", getAllContests);

router.get("/get-attendance", validateJwt, getStudentAttendanceUsingStudentId);
router.get("/get-schedule", validateJwt, getScheduleForSpecificStudent);
module.exports = router;
