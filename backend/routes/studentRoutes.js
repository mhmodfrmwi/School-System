const express = require("express");
const { login } = require("../controllers/auth/authStudentController");
const validateJwt = require("../middlewares/validateJWT");

const validateStudent = require("../middlewares/validateStudent");
const getSubjectsAcademicYearAndGradeAndSemester = require("../controllers/Student/subjectsController");
const {
  getMaterielForSpecificSubjectUsingGradeAndSemesterAndAcademicYear,
} = require("../controllers/Student/materialController");
const {
  getQuestionsBySubjectForStudent,
} = require("../controllers/Student/questionBankController");
const { 
  getContestForStudent,
  getAllContestsForStudent 
} = require("../controllers/Student/contestController");
const { getAllSchoolHubs } = require("../controllers/Student/schoolHubController");
const {
  getVirtualRoomsForStudent,
} = require("../controllers/Student/virtualRoomController");
const {
  getStudentAttendanceUsingStudentId,
} = require("../controllers/Student/attendanceController");
const {
  getScheduleForSpecificStudent,
} = require("../controllers/Student/scheduleController");
const {
  addMaterialForBookMarks,
  getAllBookmarksForStudent,
  deleteMaterialFromBookMarks,
} = require("../controllers/Student/MaterialBookMarksController");
const {
  getMaterielById,
} = require("../controllers/Teacher/materialController");

const router = express.Router();

//login route
router.route("/login").post(login);

//features routes
router.get(
  "/get-subjects",
  validateJwt,
  validateStudent,
  getSubjectsAcademicYearAndGradeAndSemester
);

router.get(
  "/materiel/:id",
  validateJwt,
  validateStudent,
  getMaterielForSpecificSubjectUsingGradeAndSemesterAndAcademicYear
);
router.get("/materiel/:subjectId/:materialId", validateJwt, getMaterielById);

router.get(
  "/questionBank/:gradeSubjectSemesterId",
  validateJwt,
  validateStudent,
  getQuestionsBySubjectForStudent
);

router.get(
  "/virtualRoom/:gradeSubjectSemesterId",
  validateJwt,
  validateStudent,

  getVirtualRoomsForStudent
);
router.get("/get-subject-contest", validateJwt, validateStudent, getContestForStudent);
router.get("/get-contests", validateJwt, validateStudent, getAllContestsForStudent);
router.get("/school-hub", validateJwt, validateStudent, getAllSchoolHubs);

router.get(
  "/get-attendance",
  validateJwt,
  validateStudent,
  getStudentAttendanceUsingStudentId
);
router.get(
  "/get-schedule",
  validateJwt,
  validateStudent,
  getScheduleForSpecificStudent
);

router.post(
  "/add-to-bookmark/:materialId",
  validateJwt,
  validateStudent,

  addMaterialForBookMarks
);
router.delete(
  "/remove-from-bookmark/:materialId",
  validateJwt,
  validateStudent,
  deleteMaterialFromBookMarks
);
router.get(
  "/get-bookmarks",
  validateJwt,
  validateStudent,
  getAllBookmarksForStudent
);
module.exports = router;
