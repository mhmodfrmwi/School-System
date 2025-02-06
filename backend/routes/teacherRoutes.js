const express = require("express");
const validateJwt = require("../middlewares/validateJWT");
const validateTeacher = require("../middlewares/validateTeacher");
const { createMateriel } = require("../controllers/Teacher/materialController");
const {
  createQuestion,
  updateQuestion,
  deleteQuestion,
  getQuestion,
  getAllQuestions,
} = require("../controllers/Teacher/questionBankController");
const {
  createVirtualRoom,
  updateVirtualRoom,
  deleteVirtualRoom,
  getVirtualRoom,
  getAllVirtualRooms,
} = require("../controllers/Teacher/virtualRoomController");
const {
  createTrip,
  getTrip,
  getAllTrips,
  updateTrip,
  deleteTrip,
} = require("../controllers/Teacher/tripController");
const {
  createStudentAttendance,
} = require("../controllers/Student/attendanceController");
const login = require("../controllers/auth/authTeacherController");
const getStudentsForSpecificSubjectUsingClassId = require("../controllers/Teacher/getStudentsForSpecificSubjectUsingClassId");
const {
  getAttendanceForClassInPeriod,
} = require("../controllers/Teacher/getAttendanceForClassInPeriod");
const router = express.Router();
router.post("/login", login);
router.post("/material", validateJwt, validateTeacher, createMateriel);

router.post("/questionBank", validateJwt, validateTeacher, createQuestion);
router
  .route("/questionBank/:id", validateJwt, validateTeacher)
  .get(getQuestion)
  .patch(updateQuestion)
  .delete(deleteQuestion);
router.get("/questionBank", validateJwt, validateTeacher, getAllQuestions);

router.post("/virtualRoom", validateJwt, validateTeacher, createVirtualRoom);
router
  .route("/virtualRoom/:id", validateJwt, validateTeacher)
  .get(getVirtualRoom)
  .patch(updateVirtualRoom)
  .delete(deleteVirtualRoom);
router.get("/virtualRoom", validateJwt, validateTeacher, getAllVirtualRooms);

router.post("/trip", validateJwt, validateTeacher, createTrip);
router
  .route("/trip/:id", validateJwt, validateTeacher)
  .get(getTrip)
  .patch(updateTrip)
  .delete(deleteTrip);
router.get("/trip", validateJwt, validateTeacher, getAllTrips);

router.get(
  "/get-students-for-subject/:gradeSubjectSemesterId",
  validateJwt,
  validateTeacher,
  getStudentsForSpecificSubjectUsingClassId
);
router.post(
  "/createAttendance",
  validateJwt,
  validateTeacher,
  createStudentAttendance
);
router.get(
  "/get-class-attendance-in-period",
  validateJwt,
  validateTeacher,
  getAttendanceForClassInPeriod
);
module.exports = router;
