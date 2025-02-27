const express = require("express");
const router = express.Router();
const {
  startSession,
  getAllSessions,
} = require("../controllers/sessionController");
const validateJwt = require("../../../backend/middlewares/validateJWT");
router.post("/:exam_id/start", validateJwt, startSession);
router.get("/", validateJwt, getAllSessions);

module.exports = router;
