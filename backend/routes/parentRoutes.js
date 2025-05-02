const express = require("express");
const uploadImage = require("../utils/uploadProfileImages");

const { login ,updateParentProfile} = require("../controllers/auth/authParentController");
const {
  showKids,
  chooseKid,
} = require("../controllers/Parent/parentController");
const validateJwt = require("../middlewares/validateJWT");
const validateParent = require("../middlewares/validateParent");
const { getLoggedInParentData }= require("../controllers/Parent/parentData");

const {
  getStudentGrades,
  getStudentSemesterGrades,
  getAllSemesterGrades,
} = require("../controllers/Parent/studentgrades");

const {
  getStudentAttendanceUsingStudentId,
} = require("../controllers/Parent/getChildAttendance");

const { getScheduleForSpecificStudent }= require("../controllers/Parent/scheduleController");

const { getAllSchoolHubs }= require("../controllers/Parent/schoolhub");

const {
  getAllContestsForStudent,
}=require("../controllers/Parent/contestController")

const {
  getAllStudentResults,
  getMissedExamsForStudent,
  getCompletedExamsForStudent,
  getCompletedExamsForSubjects,
} =require("../../microservices/exams-microservice/controllers/childExamControllerForParent")
const router = express.Router();
router.post("/login", login);
router.patch(
  "/parent-profile",
  validateJwt, validateParent,
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
  "/subject-degree/:subjectId",
  validateJwt,
  validateParent,
  getStudentGrades
);
router.get(
  "/semester-subject-degree",
  validateJwt,
  validateParent,
  getStudentSemesterGrades
);
router.get(
  "/all-subjects-degrees",
  validateJwt,
  validateParent,
  getAllSemesterGrades
);

router.get(
  "/get-attendance",
  validateJwt,
  validateParent,
  getStudentAttendanceUsingStudentId
);

router.get(
  "/get-schedule",
  validateJwt,
  validateParent,
  getScheduleForSpecificStudent
);
router.get(
  "/get-contests",
  validateJwt,
  validateParent,
  getAllContestsForStudent
);

router.get("/school-hub", validateJwt, validateParent, getAllSchoolHubs);

router.get("/student-results", validateJwt, validateParent,getAllStudentResults);
router.get("/student/missed", validateJwt,validateParent, getMissedExamsForStudent);
router.get("/student/completed", validateJwt, validateParent,getCompletedExamsForStudent);
router.get("/student/completed/all", validateJwt,validateParent, getCompletedExamsForSubjects);

///$$$$$$$$//

module.exports = router;


//module.exports = router;