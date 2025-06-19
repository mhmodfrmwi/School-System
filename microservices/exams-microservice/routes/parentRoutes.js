const express = require("express");

const {
  getAllStudentResults,
  getMissedExamsForStudent,
  getCompletedExamsForStudent,
  getCompletedExamsForSubjects,
} =require("../controllers/childExamControllerForParent");
const validateJwt = require("../../../backend/middlewares/validateJWT");
const validateParent = require("../../../backend/middlewares/validateParent");

const{
  getExamScheduleById,
  getScheduleByGradeAndSemester,
  getCurrentSemesterSchedules,
  getUpcomingExams,
}=require("../controllers/examScheduleControllerForParent");

const router = express.Router();

router.get("/student-results/:student_id", validateJwt, validateParent,getAllStudentResults);
router.get("/student/missed/:gradeSubjectSemesterId/:student_id", validateJwt, validateParent, getMissedExamsForStudent);
router.get("/student/completed-exams/:gradeSubjectSemesterId/:student_id", validateJwt, validateParent,getCompletedExamsForStudent);
router.get("/student/completed/all/:student_id", validateJwt, validateParent, getCompletedExamsForSubjects);

router.get("/:id",validateJwt, getExamScheduleById);

router.get(
  "/grade/:grade_id/semester/:semester_id",
  validateJwt,
  getScheduleByGradeAndSemester
);
router.get("/schedules/current", validateJwt, getCurrentSemesterSchedules);
router.get("/schedules/upcoming/:student_id", validateJwt, getUpcomingExams);

///$$$$$$$$//

module.exports = router;

//module.exports = router;