const express = require("express");
const router = express.Router();
const {
  startSession,
  getAllSessions,
  endSessionById,
} = require("../controllers/sessionController");
const validateJwt = require("../../../backend/middlewares/validateJWT");
router.post("/:exam_id/start", validateJwt, startSession);
router.get("/", validateJwt, getAllSessions);
router.patch("/:session_id", validateJwt, endSessionById);

module.exports = router;
