const express = require("express");
const { login } = require("../controllers/auth/authStudentController");
const validateJwt = require("../middlewares/validateJWT");
const getSubjectsAcademicYearAndGradeAndSemester = require("../controllers/Student/subjectsController");
const {
  getMaterielForSpecificSubjectUsingGradeAndSemesterAndAcademicYear,
} = require("../controllers/Student/materialController");
const{
  getQuestionsBySubjectForStudent
} = require("../controllers/Student/questionBankController");
const{
  getAllTrips
} = require("../controllers/Student/tripController");
const{
  getAllContests
} = require("../controllers/Student/contestController");
const{
  getVirtualRoomsForStudent
} = require("../controllers/Student/virtualRoomController");

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

router.get("/questionBank/:gradeSubjectSemesterId",
  validateJwt,
  getQuestionsBySubjectForStudent
);
router.get("/trip",
  validateJwt,
  getAllTrips
);
router.get("/contest",
  validateJwt,
  getAllContests
);
router.get("/virtualRoom/:gradeSubjectSemesterId",
  validateJwt,
  getVirtualRoomsForStudent
);
module.exports = router;
