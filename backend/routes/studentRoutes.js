const express = require("express");
const { login } = require("../controllers/auth/authStudentController");
const validateJwt = require("../middlewares/validateJWT");
const getSubjectsAcademicYearAndGradeAndSemester = require("../controllers/Student/subjectsController");
const {
  getMaterielForSpecificSubjectUsingGradeAndSemesterAndAcademicYear,
} = require("../controllers/Student/materialController");

const router = express.Router();

//login route
router.route("/login").post(login);

//features routes
router.get(
  "/get-subjects",
  validateJwt,
  getSubjectsAcademicYearAndGradeAndSemester
);

router.get(
  "/materiel/:id",
  validateJwt,
  getMaterielForSpecificSubjectUsingGradeAndSemesterAndAcademicYear
);
module.exports = router;
