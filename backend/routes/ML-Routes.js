const express = require("express");
const {
  modelData,
} = require("../controllers/Student/performanceTrackingController");
const validateJwt = require("../middlewares/validateJWT");
const validateStudent = require("../middlewares/validateStudent");

const router = express.Router();

router.get("/modelData", validateJwt, modelData);

module.exports = router;
