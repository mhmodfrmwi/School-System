const express = require("express");
const {
  createAcademicYear,
  getAcademicYear,
  updateAcademicYear,
  deleteAcademicYear,
  getAllAcademicYear,
} = require("../controllers/academicYearController");
const {
  createGrade,
  getGrade,
  updateGrade,
  deleteGrade,
  getAllGrade,
} = require("../controllers/gradeController");
const {
  createSubject,
  getSubject,
  updateSubject,
  deleteSubject,
  getAllSubject,
} = require("../controllers/subjectController");
const {
  createSemester,
  getSemester,
  updateSemester,
  deleteSemester,
  getAllSemester,
} = require("../controllers/semesterController");

const {
  createGradeSubjectSemester,
  deleteGradeSubjectSemester,
  updateGradeSubjectSemester,
  getGradeSubjectSemester,
  getAllGradeSubjectSemesters,
} = require("../controllers/gradeSubjectSemester");

const {
  createClass,
  updateClass,
  deleteClass,
  getClass,
  getAllClasses,
} = require("../controllers/classController");

const {
  createStudent,
  updateStudent,
  deleteStudent,
  getStudent,
  getAllStudents,
} = require("../controllers/studentController");

const router = express.Router();

//academic year routes
router.post("/academicYear/createAcademicYear", createAcademicYear);
router
  .route("/academicYear/:id")
  .get(getAcademicYear)
  .patch(updateAcademicYear)
  .delete(deleteAcademicYear);
router.get("/academicYear", getAllAcademicYear);

//grade routes
router.post("/grade/createGrade", createGrade);
router.route("/grade/:id").get(getGrade).patch(updateGrade).delete(deleteGrade);
router.get("/grade", getAllGrade);

//subject routes
router.post("/subject/createSubject", createSubject);
router
  .route("/subject/:id")
  .get(getSubject)
  .patch(updateSubject)
  .delete(deleteSubject);
router.get("/subject", getAllSubject);

//semester routes
router.post("/semester/createSemester", createSemester);
router
  .route("/semester/:id")
  .get(getSemester)
  .patch(updateSemester)
  .delete(deleteSemester);
router.get("/semester", getAllSemester);

//Grade Subjects Semester Routes
router.post(
  "/gradeSubjectSemester/createGradeSubjectSemester",
  createGradeSubjectSemester
);
router
  .route("/gradeSubjectSemester/:id")
  .get(getGradeSubjectSemester)
  .patch(updateGradeSubjectSemester)
  .delete(deleteGradeSubjectSemester);
router.get("/gradeSubjectSemester", getAllGradeSubjectSemesters);

// class Routes
router.post("/class/createClass", createClass);
router.route("/class/:id").get(getClass).patch(updateClass).delete(deleteClass);
router.get("/class", getAllClasses);

//student Routes
router.post("/student/createStudent", createStudent);
router
  .route("/student/:id")
  .get(getStudent)
  .patch(updateStudent)
  .delete(deleteStudent);
router.get("/student", getAllStudents);

module.exports = router;
