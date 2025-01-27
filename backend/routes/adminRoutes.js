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
  createTeacher,
  getTeacher,
  updateTeacher,
  deleteTeacher,
  getAllTeacher,
} = require("../controllers/teacherController");
const {
  createClassTeacher,
  getClassTeacher,
  updateClassTeacher,
  deleteClassTeacher,
  getAllClassTeacher,
} = require("../controllers/classTeacherController");
const {
  createParent,
  getParent,
  updateParent,
  deleteParent,
  getAllParent,
} = require("../controllers/parentController");
const {
  createManager,
  getManager,
  updateManager,
  deleteManager,
  getAllManager,
} = require("../controllers/managerController");
const {
  createAdmin,
  getAdmin,
  updateAdmin,
  deleteAdmin,
  getAllAdmin,
} = require("../controllers/adminController");
const {
  createSchedule,
  deleteSchedule,
  updateSchedule,
  getSchedule,
  getAllSchedule,
} = require("../controllers/scheduleController");

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

//teacher routes
router.post("/teacher/createTeacher", createTeacher);
router
  .route("/teacher/:id")
  .get(getTeacher)
  .patch(updateTeacher)
  .delete(deleteTeacher);
router.get("/teacher", getAllTeacher);

//class-teacher routes
router.post("/classTeacher/createClassTeacher", createClassTeacher);
router
  .route("/classTeacher/:id")
  .get(getClassTeacher)
  .patch(updateClassTeacher)
  .delete(deleteClassTeacher);
router.get("/classTeacher", getAllClassTeacher);

//parent routes
router.post("/parent/createParent", createParent);
router
  .route("/parent/:id")
  .get(getParent)
  .patch(updateParent)
  .delete(deleteParent);
router.get("/parent", getAllParent);

//manager routes
router.post("/manager/createManager", createManager);
router
  .route("/manager/:id")
  .get(getManager)
  .patch(updateManager)
  .delete(deleteManager);
router.get("/manager", getAllManager);

//admin routes
router.post("/admin/createAdmin", createAdmin);
router.route("/admin/:id").get(getAdmin).patch(updateAdmin).delete(deleteAdmin);
router.get("/admin", getAllAdmin);

//schedule routes
router.post("/schedule/createSchedule", createSchedule);
router
  .route("/schedule/:id")
  .get(getSchedule)
  .patch(updateSchedule)
  .delete(deleteSchedule);
router.get("/schedule", getAllSchedule);
module.exports = router;