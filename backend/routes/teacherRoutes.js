const express = require("express");
const validateJwt = require("../middlewares/validateJWT");
const validateTeacher = require("../middlewares/validateTeacher");
const {
  createMateriel,
  updateMateriel,
  deleteMateriel,
  getAllMateriels,
} = require("../controllers/Teacher/materialController");
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
  getTeacherVirtualRooms,
} = require("../controllers/Teacher/virtualRoomController");
const {
  createContest,
  getAllContests,
  getContest,
  updateContest,
  deleteContest,
} = require("../controllers/Teacher/contestController");
const {
  createStudentAttendance,
} = require("../controllers/Student/attendanceController");
const login = require("../controllers/auth/authTeacherController");
const getStudentsForSpecificSubjectUsingClassId = require("../controllers/Teacher/getStudentsForSpecificSubjectUsingClassId");
const {
  getAttendanceForClassInPeriod,
} = require("../controllers/Teacher/getAttendanceForClassInPeriod");
const { getTeacherClassesForCurrentSemester , getAllTeacherClasses} = require("../controllers/Teacher/getAllClasses");
const {
  getScheduleForSpecificTeacher,
} = require("../controllers/Teacher/scheduleController");
///////////////////////////////////
const {
  createSchoolHub,
  getAllSchoolHubs,
  getSchoolHub,
  updateSchoolHub,
  deleteSchoolHub,
} = require("../controllers/manager/SHController");
const validateManager = require("../middlewares/validateManager");


const router = express.Router();
router.post("/login", login);
router
  .route("/material/:id")
  .post(validateJwt, validateTeacher, createMateriel)
  .patch(validateJwt, validateTeacher, updateMateriel)
  .delete(validateJwt, validateTeacher, deleteMateriel)
  .get(validateJwt, validateTeacher, getAllMateriels);

router.post("/questionBank", validateJwt, validateTeacher, createQuestion);
router
  .route("/questionBank/:id")
  .get(validateJwt, validateTeacher, getQuestion)
  .patch(validateJwt, validateTeacher, updateQuestion)
  .delete(validateJwt, validateTeacher, deleteQuestion);
router.get("/questionBank", validateJwt, validateTeacher, getAllQuestions);

router.post("/virtualRoom/:gradeSubjectSemesterId/:classId", validateJwt, validateTeacher, createVirtualRoom);
router
  .route("/virtualRoom/:id")
  .get(validateJwt, validateTeacher, getVirtualRoom)
  .patch(validateJwt, validateTeacher, updateVirtualRoom)
  .delete(validateJwt, validateTeacher, deleteVirtualRoom);
router.get("/virtualRoom", validateJwt, validateTeacher, getAllVirtualRooms);
router.get("/Teacher-virtualRoom/:id", validateJwt, validateTeacher, getTeacherVirtualRooms);

router.post("/contest", validateJwt, validateTeacher, createContest);
router
  .route("/contest/:id")
  .get(validateJwt, validateTeacher, getContest)
  .patch(validateJwt, validateTeacher, updateContest)
  .delete(validateJwt, validateTeacher, deleteContest);
router.get("/contest", validateJwt, validateTeacher, getAllContests);

router.post(
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
router.post(
  "/get-class-attendance-in-period",
  validateJwt,
  validateTeacher,
  getAttendanceForClassInPeriod
);
router.get("/semester-class", validateJwt, validateTeacher, getTeacherClassesForCurrentSemester);
router.get("/class", validateJwt, validateTeacher, getAllTeacherClasses);
router.get(
  "/get-schedule",
  validateJwt,
  validateTeacher,
  getScheduleForSpecificTeacher
);
////////////////////
router.post("/schoolhub", validateJwt, validateManager, createSchoolHub);
router
  .route("/school-hub/:id")
  .get(validateJwt, validateManager, getSchoolHub)
  .patch(validateJwt, validateManager, updateSchoolHub)
  .delete(validateJwt, validateManager, deleteSchoolHub);

router.get("/school-hub", validateJwt, validateManager, getAllSchoolHubs); 
module.exports = router;
