const express = require("express");
const router = express.Router();
const { createExam, getExams } = require("../controllers/examController");

router.post("/create-exam", createExam);
router.get("/", getExams);

module.exports = router;
