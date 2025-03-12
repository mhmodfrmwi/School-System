const express = require("express");
const {
  createSchoolHub,
  getAllSchoolHubs,
  updateSchoolHub,
  deleteSchoolHub,
  getContestStudents
} = require("../controllers/manager/SHController");
const validateJwt = require("../middlewares/validateJWT");
const validateManager = require("../middlewares/validateManager");
const { login } = require("../controllers/auth/authManagerController");
const {
  getStatistics,
  getGradeStatistics,
  getDailyAttendancePercentage,
  getTop10Students
} = require("../controllers/manager/dashBoardController");

const{
  getTeachersWithPointsAndBadges,
}= require("../controllers/Teacher/teacherRewardsController");

const{
  getExamResults,
}= require("../controllers/manager/gradesController");

const router = express.Router();

router.post("/login", login);
router
  .route("/schoolhub")
  .post(validateJwt, validateManager, createSchoolHub)
  .get(validateJwt, validateManager, getAllSchoolHubs)
router
  .route("/school-hub/:schoolHubId")
  .patch(validateJwt, validateManager, updateSchoolHub)
  .delete(validateJwt, validateManager, deleteSchoolHub);

router.get("/school-hub/:schoolHubId/participants", validateJwt, validateManager, getContestStudents);
router.get("/statistics", validateJwt, validateManager, getStatistics);
router.get("/grade-statistics", validateJwt, validateManager,getGradeStatistics);
router.get("/absence-statistics", validateJwt, validateManager,getDailyAttendancePercentage);
router.get("/teachers-ranks", validateJwt, validateManager,getTeachersWithPointsAndBadges);
router.get("/students-ranks", validateJwt, validateManager,getTop10Students);
router.get("/class-results", validateJwt, validateManager,getExamResults);

module.exports = router;