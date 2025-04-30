const express = require("express");
const { getSubjects } = require("../controllers/subjectsController");
const router = express.Router();
router.get("/", getSubjects);
module.exports = router;