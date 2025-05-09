const express = require("express");
const validateJwt = require("../../../backend/middlewares/validateJWT");
const {
  createAssignment,
  getAssignments,
  getAssignmentById,
  updateAssignmentById,
  deleteAssignmentById,
  getAssignmentsForTeacher,
} = require("../controllers/assignmentController");
const {
  submitAssignment,
  deleteSubmission,
  getAssignmentSubmissions,
  gradeAssignment,
  displaySubmission,
  getStudentSubmissions,
  getMissedAssignmentsForStudent,
  getCompletedAssignmentsForStudent,
} = require("../controllers/assignmentSubmissionController");

const router = express.Router();

router.post("/create-assignment/:id", validateJwt, createAssignment);
router.get("/", validateJwt, getAssignments);
router.get("/submissions/student/", validateJwt, getStudentSubmissions);
router.get("/teacher", validateJwt, getAssignmentsForTeacher);
router.post("/missedAssignments", validateJwt, getMissedAssignmentsForStudent);
router.post(
  "/completedAssignments",
  validateJwt,
  getCompletedAssignmentsForStudent
);
router.get("/:id", validateJwt, getAssignmentById);
router.patch("/:id", validateJwt, updateAssignmentById);
router.delete("/:id", validateJwt, deleteAssignmentById);
router.post("/submit-assignment/:id", validateJwt, submitAssignment);
router.delete("/submission/:id", validateJwt, deleteSubmission);
router.patch("/submission/:id", validateJwt, gradeAssignment);
router.get("/submissions/:id", validateJwt, getAssignmentSubmissions);
router.get("/submissions/get-submission/:id", validateJwt, displaySubmission);
module.exports = router;
