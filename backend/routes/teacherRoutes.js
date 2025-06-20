const express = require("express");
const multer = require("multer");
const validateJwt = require("../middlewares/validateJWT");
const validateTeacher = require("../middlewares/validateTeacher");
const uploadImage = require("../utils/uploadProfileImages");

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
  getSubjestSemesterQuestions,
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
  getTeamsForContest,
} = require("../controllers/Teacher/contestController");
const {
  createStudentAttendance,
} = require("../controllers/Student/attendanceController");
const {
  login,
  updateTeacherProfile,
} = require("../controllers/auth/authTeacherController");
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
  getAllSchoolHubs,
} = require("../controllers/Teacher/schoolHubController");
const {
  getDailyPoints,
  getAllPoints,
  getTeachersWithPointsAndBadges,
  getTeacherWithPointsAndBadges,
} = require("../controllers/Teacher/teacherRewardsController");
const {
  getGradeData,
  uploadScoresFromExcel,
  getExamResults,
  updateScoresFromExcel,
  deleteExamResults,
} = require("../controllers/Teacher/subjectScore");

const {
  handleVrLinkClick,
  getVirtualRoomsForTeacher,
  getCompletedVirtualRooms,
  getMissedVirtualRooms,
} = require("../controllers/Teacher/gettingManagerVirtualRooms");
const {
  getLoggedInTeacherData,
} = require("../controllers/Teacher/teacherData");

const router = express.Router();

const upload = multer({ dest: "uploads/" });

router.post("/login", login);

router.patch(
  "/teacher-profile",
  validateJwt,

  uploadImage.single("profileImage"),
  (err, req, res, next) => {
    console.log(req.file);
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ error: err.message });
    } else if (err) {
      return res.status(400).json({ error: err.message });
    }
    next();
  },
  updateTeacherProfile
);

router
  .route("/material/:id")
  .post(validateJwt, createMateriel)
  .patch(validateJwt, updateMateriel)
  .delete(validateJwt, deleteMateriel)
  .get(validateJwt, getAllMateriels);

router.post(
  "/questionBank/:gradeSubjectSemesterId",
  validateJwt,

  createQuestion
);
router
  .route("/questionBank/:questionId")
  .get(validateJwt, getQuestion)
  .patch(validateJwt, updateQuestion)
  .delete(validateJwt, deleteQuestion);
router.get(
  "/questionBank/:gradeSubjectSemesterId/my-questions",
  validateJwt,

  getTeacherQuestions
);
router.get(
  "/questionBank/:gradeSubjectSemesterId/all-questions",
  validateJwt,

  getSubjestSemesterQuestions
);

router.post(
  "/virtualRoom/:gradeSubjectSemesterId/:classId",
  validateJwt,

  createVirtualRoom
);
router
  .route("/virtualRoom/:id")
  .get(validateJwt, getVirtualRoom)
  .patch(validateJwt, updateVirtualRoom)
  .delete(validateJwt, deleteVirtualRoom);
router.get("/virtualRoom", validateJwt, getAllVirtualRooms);
router.get(
  "/Teacher-virtualRoom/:id",
  validateJwt,

  getTeacherVirtualRooms
);

router.post("/contest", validateJwt, createContest);
router
  .route("/contest/:id")
  .get(validateJwt, getContest)
  .patch(validateJwt, updateContest)
  .delete(validateJwt, deleteContest);
router.get("/contest", validateJwt, getAllContests);
router.get(
  "/contest/:contestId/teams",
  validateJwt,

  getTeamsForContest
);

router.post(
  "/get-students-for-subject/:gradeSubjectSemesterId",
  validateJwt,

  getStudentsForSpecificSubjectUsingClassId
);
router.post(
  "/createAttendance",
  validateJwt,

  createStudentAttendance
);
router.post(
  "/get-class-attendance-in-period",
  validateJwt,

  getAttendanceForClassInPeriod
);
router.get("/semester-class", validateJwt, getTeacherClassesForCurrentSemester);
router.get("/class", validateJwt, getAllTeacherClasses);
router.get(
  "/get-schedule",
  validateJwt,

  getScheduleForSpecificTeacher
);

//material for library
router.post(
  "/library-material",
  validateJwt,

  createMaterialForLibrary
);

router.delete(
  "/library-material/:id",
  validateJwt,

  deleteMaterialForLibrary
);
router.get("/school-hub", validateJwt, getAllSchoolHubs);
router.get("/daily-reward", validateJwt, getDailyPoints);
router.get("/reward", validateJwt, getAllPoints);
router.get(
  "/all-teacher-reward",
  validateJwt,

  getTeachersWithPointsAndBadges
);
router.get(
  "/teacher-points",
  validateJwt,

  getTeacherWithPointsAndBadges
);
router.get(
  "/exam-score/:classId/:gradeSubjectSemesterId/students",
  validateJwt,

  getGradeData
);
/////
router
  .route("/exam-score/:classId/:gradeSubjectSemesterId")
  .post(
    validateJwt,

    upload.single("file"),
    uploadScoresFromExcel
  )
  .patch(
    validateJwt,

    upload.single("file"),
    updateScoresFromExcel
  );
router
  .route("/exam-results/:classId/:gradeSubjectSemesterId/:type")
  .get(validateJwt, getExamResults)
  .delete(validateJwt, deleteExamResults);
///manager vr
router.get(
  "/virtual-rooms",
  validateJwt,

  getVirtualRoomsForTeacher
);
router.get(
  "/virtual-rooms/completed",
  validateJwt,

  getCompletedVirtualRooms
);
router.get(
  "/virtual-rooms/missed",
  validateJwt,

  getMissedVirtualRooms
);
router.post(
  "/virtual-rooms/:virtualRoomId/click",
  validateJwt,

  handleVrLinkClick
);
router.get(
  "/teacher-data",
  validateJwt,

  getLoggedInTeacherData
);
module.exports = router;
