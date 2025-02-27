const express = require("express");
const router = express.Router();
const {
  createExam,
  getExams,
  getExam,
} = require("../controllers/examController");
const validateJwt = require("../../../backend/middlewares/validateJWT");

router.post("/create-exam", validateJwt, createExam);
router.get("/", validateJwt, getExams);
router.get("/:id", validateJwt, getExam);

module.exports = router;
