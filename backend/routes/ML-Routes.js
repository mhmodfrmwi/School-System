const express = require("express");
const {
  modelData,
} = require("../controllers/Student/performanceTrackingController");
/*const {
  StudentmodelDataForParent,
} = require("../controllers/Parent/studentPerfomance");
*/
const validateJwt = require("../middlewares/validateJWT");
const validateStudent = require("../middlewares/validateStudent");

const router = express.Router();

router.get("/modelData", validateJwt, modelData);
//router.get("/modelData/:student_id", validateJwt, StudentmodelDataForParent);

module.exports = router;
