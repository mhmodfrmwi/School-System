const express = require("express");
const uploadImage = require("../utils/uploadProfileImages");

const {
  createSchoolHub,
  getAllSchoolHubs,
  updateSchoolHub,
  deleteSchoolHub,
  getContestStudents,
} = require("../controllers/manager/SHController");
const validateJwt = require("../middlewares/validateJWT");
const validateManager = require("../middlewares/validateManager");
const { login ,updateManagerProfile } = require("../controllers/auth/authManagerController");

const {
  getStatistics,
  getGradeStatistics,
  getDailyAttendancePercentage,
  getTop10Students,
} = require("../controllers/manager/dashBoardController");

const {
  getTeachersWithPointsAndBadges,
} = require("../controllers/Teacher/teacherRewardsController");

const {
  getExamResults,
  getUniqueNames,
} = require("../controllers/manager/gradesController");
const {
  FetchClasses,
  FetchAbsenceForClassInDay,
} = require("../controllers/manager/absenceController");
const {
  getAttendanceForClassInPeriod,
} = require("../controllers/Teacher/getAttendanceForClassInPeriod");

//vr
const {
  createVirtualRoom,
  updateVirtualRoom,
  deleteVirtualRoom,
  getVirtualRoom,
  getAllVirtualRooms,
} = require("../controllers/manager/virtualRoomController");

const {
  getSchedule,
  getScheduleByClassId,
} = require("../controllers/Admin/scheduleController");

const {
  getLoggedInManagerData,
} = require("../controllers/manager/managerData");

const router = express.Router();

router.post("/login", login);
router.patch(
  "/manager-profile",
  validateJwt, 
  validateManager,
  uploadImage.single("profileImage"),
  (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ error: err.message });
    } else if (err) {
      return res.status(400).json({ error: err.message });
    }
    next();
  },
  updateManagerProfile
);
router
  .route("/schoolhub")
  .post(validateJwt, validateManager, createSchoolHub)
  .get(validateJwt, validateManager, getAllSchoolHubs);
router
  .route("/school-hub/:schoolHubId")
  .patch(validateJwt, validateManager, updateSchoolHub)
  .delete(validateJwt, validateManager, deleteSchoolHub);

router.get(
  "/school-hub/:schoolHubId/participants",
  validateJwt,
  validateManager,
  getContestStudents
);
router.get("/statistics", validateJwt, validateManager, getStatistics);
router.get(
  "/grade-statistics",
  validateJwt,
  validateManager,
  getGradeStatistics
);
router.get(
  "/absence-statistics",
  validateJwt,
  validateManager,
  getDailyAttendancePercentage
);
router.get(
  "/teachers-ranks",
  validateJwt,
  validateManager,
  getTeachersWithPointsAndBadges
);
router.get("/students-ranks", validateJwt, validateManager, getTop10Students);
router.get(
  "/class-results/:gradeName/:className/:subjectName",
  validateJwt,
  validateManager,
  getExamResults
);
router.get(
  "/class-grade-subject-names",
  validateJwt,
  validateManager,
  getUniqueNames
);

// absence routes
router.get("/classes", validateJwt, validateManager, FetchClasses);
router.post(
  "/classes",
  validateJwt,
  validateManager,
  FetchAbsenceForClassInDay
);

//vr
router.post("/virtualRoom", validateJwt, validateManager, createVirtualRoom);
router
  .route("/virtualRoom/:id")
  .get(validateJwt, validateManager, getVirtualRoom)
  .patch(validateJwt, validateManager, updateVirtualRoom)
  .delete(validateJwt, validateManager, deleteVirtualRoom);
router.get("/virtualRoom", validateJwt, validateManager, getAllVirtualRooms);

router.get(
  "/schedule/:classId",
  validateJwt,
  validateManager,
  getScheduleByClassId
);
router.get(
  "/manager-data",
  validateJwt,
  validateManager,
  getLoggedInManagerData,
);
module.exports = router;
