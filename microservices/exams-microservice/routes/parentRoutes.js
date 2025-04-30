const express = require("express");

const {
  getAllStudentResults,
  getMissedExamsForStudent,
  getCompletedExamsForStudent,
  getCompletedExamsForSubjects,
} =require("../controllers/childExamControllerForParent");
const validateJwt = require("../../../backend/middlewares/validateJWT");
const validateParent = require("../../../backend/middlewares/validateParent");
const router = express.Router();

router.get("/student-results", validateJwt, validateParent,getAllStudentResults);
router.get("/student/missed/:gradeSubjectSemesterId", validateJwt, validateParent, getMissedExamsForStudent);
router.get("/student/completed-exams/:gradeSubjectSemesterId", validateJwt, validateParent,getCompletedExamsForStudent);
router.get("/student/completed/all", validateJwt, validateParent, getCompletedExamsForSubjects);

///$$$$$$$$//

module.exports = router;

//module.exports = router;