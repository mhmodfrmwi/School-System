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

router.get("/student-results/:student_id", validateJwt, validateParent,getAllStudentResults);
router.get("/student/missed/:gradeSubjectSemesterId/:student_id", validateJwt, validateParent, getMissedExamsForStudent);
router.get("/student/completed-exams/:gradeSubjectSemesterId/:student_id", validateJwt, validateParent,getCompletedExamsForStudent);
router.get("/student/completed/all/:student_id", validateJwt, validateParent, getCompletedExamsForSubjects);

///$$$$$$$$//

module.exports = router;

//module.exports = router;