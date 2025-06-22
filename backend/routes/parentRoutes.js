const express = require("express");
const uploadImage = require("../utils/uploadProfileImages");

const {
  login,
  updateParentProfile,
} = require("../controllers/auth/authParentController");
const {
  showKids,
  chooseKid,
} = require("../controllers/Parent/parentController");
const validateJwt = require("../middlewares/validateJWT");
const validateParent = require("../middlewares/validateParent");
const { getLoggedInParentData } = require("../controllers/Parent/parentData");

const {
  getStudentGrades,
  getStudentSemesterGrades,
  getAllSemesterGrades,
  getStudentGradesReport
} = require("../controllers/Parent/studentgrades");

const {
  getStudentAttendanceUsingStudentId,
} = require("../controllers/Parent/getChildAttendance");

const {
  getScheduleForSpecificStudent,
} = require("../controllers/Parent/scheduleController");

const { getAllSchoolHubs } = require("../controllers/Parent/schoolhub");

const {
  getAllContestsForStudent,
} = require("../controllers/Parent/contestController");

const {
  getAllStudentResults,
  getMissedExamsForStudent,
  getCompletedExamsForStudent,
  getCompletedExamsForSubjects,
} = require("../../microservices/exams-microservice/controllers/childExamControllerForParent");
const { getDashboardData } = require("../controllers/Parent/studentDashboard");
const { getBulkDashboardData } = require("../controllers/Parent/studentDashboard");

const {
  getDailyPoints,
  getAllPoints,
  getSemesterPoints,
  getStudentWithFriendsPoints,
  getAllStudentRewardsData,
} = require("../controllers/Parent/childReward");
const getSubjectsAcademicYearAndGradeAndSemester = require("../controllers/Parent/getGradeSubjectSemesterForChild");
const {
  getVirtualRoomsForStudent,
  //handleVrLinkClick,
  getCompletedVirtualRooms,
  getMissedVirtualRooms,
  getCompletedNotMissedVirtualRooms,
} = require("../controllers/Parent/virtualRoom");

const router = express.Router();
router.post("/login", login);
router.patch(
  "/parent-profile",
  validateJwt,
  validateParent,
  uploadImage.single("profileImage"),
  (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ error: err.message });
    } else if (err) {
      return res.status(400).json({ error: err.message });
    }
    next();
  },
  updateParentProfile
);

router.get("/kids", validateJwt, validateParent, showKids);
router.post("/chooseKid", validateJwt, validateParent, chooseKid);
router.get("/parent-data", validateJwt, validateParent, getLoggedInParentData);

///$$$$$$$$//
router.get(
  "/subject-degree/:subjectId/:studentId",
  validateJwt,
  validateParent,
  getStudentGrades
);
router.get(
  "/semester-subject-degree/:studentId",
  validateJwt,
  validateParent,
  getStudentSemesterGrades
);
router.get(
  "/all-subjects-degrees/:studentId",
  validateJwt,
  validateParent,
  getAllSemesterGrades
);

router.get(
  "/grade-report/:studentId",
  validateJwt,
  validateParent,
  getStudentGradesReport
);

router.get(
  "/get-attendance/:studentId",
  validateJwt,
  validateParent,
  getStudentAttendanceUsingStudentId
);

router.get(
  "/get-schedule/:studentId",
  validateJwt,
  validateParent,
  getScheduleForSpecificStudent
);
router.get(
  "/get-contests/:studentId",
  validateJwt,
  validateParent,
  getAllContestsForStudent
);

router.get("/school-hub/:studentId", validateJwt, validateParent, getAllSchoolHubs);

router.get(
  "/student-results",
  validateJwt,
  validateParent,
  getAllStudentResults
);
router.get(
  "/student/missed",
  validateJwt,
  validateParent,
  getMissedExamsForStudent
);
router.get(
  "/student/completed",
  validateJwt,
  validateParent,
  getCompletedExamsForStudent
);
router.get(
  "/student/completed/all",
  validateJwt,
  validateParent,
  getCompletedExamsForSubjects
);

router.get("/daily-reward/:studentId", validateJwt, validateParent, getDailyPoints);
router.get("/reward/:studentId", validateJwt, validateParent, getAllPoints);
router.get("/semester-reward/:studentId", validateJwt, validateParent, getSemesterPoints);
router.get(
  "/student-with-friends-reward/:studentId",
  validateJwt,
  validateParent,
  getStudentWithFriendsPoints
);
router.get(
  "/all-reward",
  validateJwt,
  validateParent,
  getAllStudentRewardsData
);

router.get(
  "/get-subjects/:studentId",
  validateJwt,
  validateParent,
  getSubjectsAcademicYearAndGradeAndSemester
);

router.get(
  "/virtual-rooms/:gradeSubjectSemesterId/:studentId",
  validateJwt,
  validateParent,
  getVirtualRoomsForStudent
);
router.get(
  "/virtual-rooms/:gradeSubjectSemesterId/completed/:studentId",
  validateJwt,
  validateParent,
  getCompletedVirtualRooms
);
router.get(
  "/virtual-rooms/:gradeSubjectSemesterId/missed/:studentId",
  validateJwt,
  validateParent,
  getMissedVirtualRooms
);
router.get(
  "/virtual-rooms/completed-not-missed/:gradeSubjectSemesterId/:studentId",
  validateJwt,
  validateParent,
  getCompletedNotMissedVirtualRooms
);

router.get("/dashboard/:studentId", validateJwt, getBulkDashboardData);
///$$$$$$$$//


module.exports = router;

//module.exports = router;
