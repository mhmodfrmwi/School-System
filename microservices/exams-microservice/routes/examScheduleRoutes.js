const express = require("express");
const router = express.Router();
const validateJwt = require("../../../backend/middlewares/validateJWT");
const {
  createExamSchedule,
  getExamScheduleById,
  updateExamSchedule,
  deleteExamSchedule,
  getScheduleByGradeAndSemester,
  getCurrentSemesterSchedules,
  getUpcomingExams,
} = require("../controllers/examScheduleController");

router.post("/", validateJwt, createExamSchedule);
router
  .route("/:id")
  .get(validateJwt, getExamScheduleById)
  .patch(validateJwt, updateExamSchedule)
  .delete(validateJwt, deleteExamSchedule);

router.get(
  "/grade/:grade_id/semester/:semester_id",
  validateJwt,
  getScheduleByGradeAndSemester
);
router.get("/schedules/current", validateJwt, getCurrentSemesterSchedules);
router.get("/schedules/upcoming", validateJwt, getUpcomingExams);
module.exports = router;
