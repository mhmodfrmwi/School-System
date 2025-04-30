const express = require("express");
const { extractToken } = require("../middleware/auth");
const { getGrades } = require("../controllers/gradesController");
const router = express.Router();

router.get("/", extractToken, getGrades);

module.exports = router;
