const express = require("express");
const router = express.Router();
const {
  createExam,
  getExams,
  getExam,
  updateExamById,
  deleteExamById,
  getExamResultsForTeacher,
} = require("../controllers/examController");
const validateJwt = require("../../../backend/middlewares/validateJWT");

router.post("/create-exam/:id", validateJwt, createExam);
router.get("/", validateJwt, getExams);
router
  .route("/:id")
  .get(validateJwt, getExam)
  .patch(validateJwt, updateExamById)
  .delete(validateJwt, deleteExamById);
router.get("/:id/results", validateJwt, getExamResultsForTeacher);

module.exports = router;
