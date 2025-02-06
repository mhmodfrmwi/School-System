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
  .route("/questionBank/:id")
  .get(validateJwt, validateTeacher, getQuestion)
  .patch(validateJwt, validateTeacher, updateQuestion)
  .delete(validateJwt, validateTeacher,deleteQuestion);
router.get("/questionBank", validateJwt, validateTeacher, getAllQuestions);

router.post("/virtualRoom", validateJwt, validateTeacher, createVirtualRoom);
router
  .route("/virtualRoom/:id")
  .get(validateJwt, validateTeacher, getVirtualRoom)
  .patch(validateJwt, validateTeacher, updateVirtualRoom)
  .delete(validateJwt, validateTeacher,deleteVirtualRoom);
router.get("/virtualRoom", validateJwt, validateTeacher, getAllVirtualRooms);

router.post("/trip", validateJwt, validateTeacher, createTrip);
router
  .route("/trip/:id")
  .get(validateJwt, validateTeacher, getTrip)
  .patch(validateJwt, validateTeacher, updateTrip)
  .delete(validateJwt, validateTeacher,deleteTrip);
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
