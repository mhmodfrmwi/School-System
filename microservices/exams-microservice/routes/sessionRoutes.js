const express = require("express");
const router = express.Router();
const {
  startSession,
  getAllSessions,
} = require("../controllers/sessionController");
const validateJwt = require("../../../backend/middlewares/validateJWT");
const { submitAnswers } = require("../controllers/answerController");
router.post("/:exam_id/start", validateJwt, startSession);
router.get("/", validateJwt, getAllSessions);
router.post("/:session_id/answers", validateJwt, submitAnswers);
module.exports = router;
