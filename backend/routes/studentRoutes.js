const express = require("express");
const uploadImage = require("../utils/uploadProfileImages");
const {
  login,
  updateStudentProfile,
} = require("../controllers/auth/authStudentController");
const validateJwt = require("../middlewares/validateJWT");

const validateStudent = require("../middlewares/validateStudent");
const getSubjectsAcademicYearAndGradeAndSemester = require("../controllers/Student/subjectsController");
const {
  getMaterialForSpecificSubject,
  getMaterialForSpecificGrade,
} = require("../controllers/Student/materialController");
const {
  getQuestionsBySubjectForStudent,
  getAllQuestionsForAllSubjects,
} = require("../controllers/Student/questionBankController");
const {
  addQuestionToBookmarks,
  getAllBookmarkedQuestions,
  deleteQuestionFromBookmarks,
} = require("../controllers/Student/questionankBookMarksController");
const {
  updateQuestionView,
  getQuestionViewByQuestionId,
} = require("../controllers/Student/questionBankViewController");
const {
  getContestForStudent,
  getAllContestsForStudent,
} = require("../controllers/Student/contestController");
const {
  getAllSchoolHubs,
  registerInContest,
  checkParticipation, //get my status
  deleteRegistration,
} = require("../controllers/Student/schoolHubController");
const {
  getVirtualRoomsForStudent,
  handleVrLinkClick,
  getCompletedVirtualRooms,
  getMissedVirtualRooms,
} = require("../controllers/Student/virtualRoomController");
const {
  getStudentAttendanceUsingStudentId,
  getStudentAttendanceWithStudentId,
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
const {
  updateMaterialView,
  getMaterialViewByMaterialId,
} = require("../controllers/Student/materialViewController");
const {
  updateLastUserViewForLibraryItem,
  getLibraryItemsViewsForStudent,
} = require("../controllers/Student/student-libraryItemController");
const {
  createTeam,
  getStudentsInSameClassAndGrade,
  getTeamsForStudentInContest,
  editTeam,
  deleteTeam,
} = require("../controllers/Student/contestTeamMembersController");
const {
  updateLibraryMaterialView,
  getLibraryMaterialViewByMaterialId,
  getLibraryMaterialViewsForStudent,
} = require("../controllers/Student/libraryMaterialViewController");
const {
  getPublicLibraryTypePdf,
  getPublicLibraryTypeVideo,
} = require("../controllers/General/libraryItemController");
const {
  getDailyPoints,
  getAllPoints,
  getSemesterPoints,
  getStudentWithFriendsPoints,
  getAllStudentRewardsData,
} = require("../controllers/Student/studentRewardsController");
const {
  getStudentGrades,
  getStudentSemesterGrades,
  getAllSemesterGrades,
} = require("../controllers/Student/getStudentGrade");

const {
  getLoggedInStudentData,
} = require("../controllers/Student/studentData");

const router = express.Router();

//login route
router.route("/login").post(login);

router.patch(
  "/student-profile",
  validateJwt,
  validateStudent,
  uploadImage.single("profileImage"),
  (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ error: err.message });
    } else if (err) {
      return res.status(400).json({ error: err.message });
    }
    next();
  },
  updateStudentProfile
);

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
  getMaterialForSpecificSubject
);
router.get(
  "/material/grade",
  validateJwt,
  validateStudent,
  getMaterialForSpecificGrade
);
router.get("/materiel/:subjectId/:materialId", validateJwt, getMaterielById);

router.get(
  "/questionBank/getAllBankQuestions",
  validateJwt,
  getAllQuestionsForAllSubjects
);
router.get(
  "/questionBank/:gradeSubjectSemesterId",
  validateJwt,
  validateStudent,
  getQuestionsBySubjectForStudent
);
router.post(
  "/add-question-to-bookmark/:questionId",
  validateJwt,
  validateStudent,
  addQuestionToBookmarks
);
router.delete(
  "/remove-question-from-bookmark/:questionId",
  validateJwt,
  validateStudent,
  deleteQuestionFromBookmarks
);
router.get(
  "/get-question-bookmarks",
  validateJwt,
  validateStudent,
  getAllBookmarkedQuestions
);

router
  .route("/question/:questionId")
  .patch(validateJwt, validateStudent, updateQuestionView)
  .get(validateJwt, validateStudent, getQuestionViewByQuestionId);
router.get(
  "/virtual-rooms/:gradeSubjectSemesterId",
  validateJwt,
  validateStudent,
  getVirtualRoomsForStudent
);
router.get(
  "/virtual-rooms/:gradeSubjectSemesterId/completed",
  validateJwt,
  validateStudent,
  getCompletedVirtualRooms
);
router.get(
  "/virtual-rooms/:gradeSubjectSemesterId/missed",
  validateJwt,
  validateStudent,
  getMissedVirtualRooms
);
router.post(
  "/virtual-rooms/:virtualRoomId/click",
  validateJwt,
  validateStudent,
  handleVrLinkClick
);

router.get(
  "/get-subject-contest",
  validateJwt,
  validateStudent,
  getContestForStudent
);
router.get(
  "/get-contests",
  validateJwt,
  validateStudent,
  getAllContestsForStudent
);

router.get("/school-hub", validateJwt, validateStudent, getAllSchoolHubs);
router
  .route("/school-hub/:schoolHubId")
  .post(validateJwt, validateStudent, registerInContest)
  .delete(validateJwt, validateStudent, deleteRegistration)
  .get(validateJwt, validateStudent, checkParticipation);

router.get(
  "/get-attendance",
  validateJwt,
  validateStudent,
  getStudentAttendanceUsingStudentId
);
router.get(
  "/getAttendanceForChatbot",
  validateJwt,
  validateStudent,
  getStudentAttendanceWithStudentId
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

router
  .route("/material/:id")
  .patch(validateJwt, validateStudent, updateMaterialView)
  .get(validateJwt, validateStudent, getMaterialViewByMaterialId);

router.patch(
  "/library-item-view/:id",
  validateJwt,
  validateStudent,
  updateLastUserViewForLibraryItem
);
router.get(
  "/library-items-views",
  validateJwt,
  validateStudent,
  getLibraryItemsViewsForStudent
);
router
  .route("/get-contests/:contestId/team")
  .post(validateJwt, validateStudent, createTeam)
  .get(validateJwt, validateStudent, getTeamsForStudentInContest);
router
  .route("/get-contests/:teamId/team")
  .patch(validateJwt, validateStudent, editTeam)
  .delete(validateJwt, validateStudent, deleteTeam);
router.get(
  "/get-teammates",
  validateJwt,
  validateStudent,
  getStudentsInSameClassAndGrade
);

router.patch(
  "/library-material/:id",
  validateJwt,
  validateStudent,
  updateLibraryMaterialView
);
router.get(
  "/library-material/:id",
  validateJwt,
  validateStudent,
  getLibraryMaterialViewByMaterialId
);
router.get(
  "/library-material-views",
  validateJwt,
  validateStudent,
  getLibraryMaterialViewsForStudent
);

router.get("/daily-reward", validateJwt, validateStudent, getDailyPoints);
router.get("/reward", validateJwt, validateStudent, getAllPoints);
router.get("/semester-reward", validateJwt, validateStudent, getSemesterPoints);
router.get(
  "/student-with-friends-reward",
  validateJwt,
  validateStudent,
  getStudentWithFriendsPoints
);
router.get(
  "/all-reward",
  validateJwt,
  validateStudent,
  getAllStudentRewardsData
);
router.get(
  "/subject-degree/:subjectId",
  validateJwt,
  validateStudent,
  getStudentGrades
);
router.get(
  "/semester-subject-degree",
  validateJwt,
  validateStudent,
  getStudentSemesterGrades
);
router.get(
  "/all-subjects-degrees",
  validateJwt,
  validateStudent,
  getAllSemesterGrades
);
router.get(
  "/student-data",
  validateJwt,
  validateStudent,
  getLoggedInStudentData
);
module.exports = router;
