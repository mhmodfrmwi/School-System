const express = require("express");

const {
  getAllStudentResults,
  getMissedExamsForStudent,
  getCompletedExamsForStudent,
  getCompletedExamsForSubjects,
  getAllExamsForStudent,
  getUpcomingExamsForStudent,
  getRunningExamsForStudent
} =require("../controllers/childExamControllerForParent");
const validateJwt = require("../../../backend/middlewares/validateJWT");
const validateParent = require("../../../backend/middlewares/validateParent");

const{
  getExamScheduleById,
  getScheduleByGradeAndSemester,
  getCurrentSemesterSchedules,
  getUpcomingExams,
}=require("../controllers/examScheduleControllerForParent");

const {
  getAssignments,
  getAssignmentById,

  getStudentSubmissions,
  getMissedAssignmentsForStudent,
  getCompletedAssignmentsForStudent,
  getUpcomingUnsubmittedAssignments
} = require("../controllers/childAssignmentControllerForParent");

const router = express.Router();

router.get("/student-results/:student_id", validateJwt, validateParent,getAllStudentResults);
router.get("/student/missed/:gradeSubjectSemesterId/:student_id", validateJwt, validateParent, getMissedExamsForStudent);
router.get("/student/completed-exams/:gradeSubjectSemesterId/:student_id", validateJwt, validateParent,getCompletedExamsForStudent);
router.get("/student/completed/all/:student_id", validateJwt, validateParent, getCompletedExamsForSubjects);

router.get("/student/all-exams/:gradeSubjectSemesterId/:student_id", validateJwt, validateParent, getAllExamsForStudent);
router.get("/student/Upcoming-Exams-exams/:gradeSubjectSemesterId/:student_id", validateJwt, validateParent, getUpcomingExamsForStudent);
router.get("/student/Running-Exams-exams/:gradeSubjectSemesterId/:student_id", validateJwt, validateParent, getRunningExamsForStudent);

router.get("/:id",validateJwt, getExamScheduleById);

router.get(
  "/grade/:grade_id/semester/:semester_id",
  validateJwt,
  getScheduleByGradeAndSemester
);
router.get("/schedules/current", validateJwt, getCurrentSemesterSchedules);
router.get("/schedules/upcoming/:student_id", validateJwt, getUpcomingExams);

router.get("/assignments/:gradeSubjectSemesterId/:student_id", validateJwt,validateParent, getAssignments);
router.get("/Assignment/:id", validateJwt,validateParent, getAssignmentById);//not needed
router.get("/submissions/student/:studentId", validateJwt,validateParent, getStudentSubmissions);//done

router.get("/missedAssignments/:gradeSubjectSemesterId/:student_id", validateJwt,validateParent, getMissedAssignmentsForStudent);//done
router.get(
  "/completedAssignments/:gradeSubjectSemesterId/:student_id",
  validateJwt,
  validateParent,
  getCompletedAssignmentsForStudent
);//done

router.get(
  "/notSubmittedNotEndedAssignments/:gradeSubjectSemesterId/:student_id",
  validateJwt,
  validateParent,
  getUpcomingUnsubmittedAssignments
);

///$$$$$$$$//

module.exports = router;

//module.exports = router;