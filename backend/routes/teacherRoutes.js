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
  getTeacherQuestions,
  getSubjestSemesterQuestions
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
  getTeamsForContest
} = require("../controllers/Teacher/contestController");
const {
  createStudentAttendance,
} = require("../controllers/Student/attendanceController");
const login = require("../controllers/auth/authTeacherController");
const getStudentsForSpecificSubjectUsingClassId = require("../controllers/Teacher/getStudentsForSpecificSubjectUsingClassId");
const {
  getAttendanceForClassInPeriod,
} = require("../controllers/Teacher/getAttendanceForClassInPeriod");
const {
  getTeacherClassesForCurrentSemester,
  getAllTeacherClasses,
} = require("../controllers/Teacher/getAllClasses");
const {
  getScheduleForSpecificTeacher,
} = require("../controllers/Teacher/scheduleController");
const {
  createMaterialForLibrary,
  deleteMaterialForLibrary,
} = require("../controllers/Teacher/MatrialForLibrary");
const {
  getAllSchoolHubs
} = require("../controllers/Teacher/schoolHubController");
const{
  getDailyPoints,
  getAllPoints,
  getTeachersWithPointsAndBadges,
  getTeacherWithPointsAndBadges
}= require("../controllers/Teacher/teacherRewardsController");
const{
  getGradeData,
  uploadGrades,
}= require("../controllers/Teacher/subjectScore");

const router = express.Router();
router.post("/login", login);
router
  .route("/material/:id")
  .post(validateJwt, validateTeacher, createMateriel)
  .patch(validateJwt, validateTeacher, updateMateriel)
  .delete(validateJwt, validateTeacher, deleteMateriel)
  .get(validateJwt, validateTeacher, getAllMateriels);

router.post("/questionBank/:gradeSubjectSemesterId", validateJwt, validateTeacher, createQuestion);
router
  .route("/questionBank/:questionId")
  .get(validateJwt, validateTeacher, getQuestion)
  .patch(validateJwt, validateTeacher, updateQuestion)
  .delete(validateJwt, validateTeacher, deleteQuestion);;
router.get("/questionBank/:gradeSubjectSemesterId/my-questions", validateJwt, validateTeacher, getTeacherQuestions);
router.get("/questionBank/:gradeSubjectSemesterId/all-questions", validateJwt, validateTeacher, getSubjestSemesterQuestions);

router.post(
  "/virtualRoom/:gradeSubjectSemesterId/:classId",
  validateJwt,
  validateTeacher,
  createVirtualRoom
);
router
  .route("/virtualRoom/:id")
  .get(validateJwt, validateTeacher, getVirtualRoom)
  .patch(validateJwt, validateTeacher, updateVirtualRoom)
  .delete(validateJwt, validateTeacher, deleteVirtualRoom);
router.get("/virtualRoom", validateJwt, validateTeacher, getAllVirtualRooms);
router.get(
  "/Teacher-virtualRoom/:id",
  validateJwt,
  validateTeacher,
  getTeacherVirtualRooms
);

router.post("/contest", validateJwt, validateTeacher, createContest);
router
  .route("/contest/:id")
  .get(validateJwt, validateTeacher, getContest)
  .patch(validateJwt, validateTeacher, updateContest)
  .delete(validateJwt, validateTeacher, deleteContest);
router.get("/contest", validateJwt, validateTeacher, getAllContests);
router.get("/contest/:contestId/teams", validateJwt, validateTeacher, getTeamsForContest);

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
router.get(
  "/semester-class",
  validateJwt,
  validateTeacher,
  getTeacherClassesForCurrentSemester
);
router.get("/class", validateJwt, validateTeacher, getAllTeacherClasses);
router.get(
  "/get-schedule",
  validateJwt,
  validateTeacher,
  getScheduleForSpecificTeacher
);

//material for library
router.post(
  "/library-material",
  validateJwt,
  validateTeacher,
  createMaterialForLibrary
);

router.delete(
  "/library-material/:id",
  validateJwt,
  validateTeacher,
  deleteMaterialForLibrary
);
router.get("/school-hub", validateJwt, validateTeacher, getAllSchoolHubs);
router.get(
  "/daily-reward",
  validateJwt,
  validateTeacher,
  getDailyPoints
);
router.get(
  "/reward",
  validateJwt,
  validateTeacher,
  getAllPoints
);
router.get(
  "/all-teacher-reward",
  validateJwt,
  validateTeacher,
  getTeachersWithPointsAndBadges
);
router.get("/teacher-points",
  validateJwt,
  validateTeacher,
  getTeacherWithPointsAndBadges
);
router.get("/exam-score/:classId/:gradeSubjectSemesterId/students",
  validateJwt,
  validateTeacher,
  getGradeData
);

router.post("/exam-score/:classId/:gradeSubjectSemesterId",
  validateJwt,
  validateTeacher,
  uploadGrades
);

module.exports = router;
