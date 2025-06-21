const express = require("express");
const validateAdmin = require("../middlewares/validateAdmin");
const validateJwt = require("../middlewares/validateJWT");
const uploadImage = require("../utils/uploadProfileImages");

const {
  createAcademicYear,
  getAcademicYear,
  updateAcademicYear,
  deleteAcademicYear,
  getAllAcademicYear,
} = require("../controllers/Admin/academicYearController");
const {
  createGrade,
  getGrade,
  updateGrade,
  deleteGrade,
  getAllGrade,
} = require("../controllers/Admin/gradeController");
const {
  createSubject,
  getSubject,
  updateSubject,
  deleteSubject,
  getAllSubject,
} = require("../controllers/Admin/subjectController");
const {
  createSemester,
  getSemester,
  updateSemester,
  deleteSemester,
  getAllSemester,
} = require("../controllers/Admin/semesterController");
const {
  createTeacher,
  getTeacher,
  updateTeacher,
  deleteTeacher,
  getAllTeacher,
} = require("../controllers/Admin/teacherController");
const {
  createClassTeacher,
  getClassTeacher,
  updateClassTeacher,
  deleteClassTeacher,
  getAllClassTeacher,
} = require("../controllers/Admin/classTeacherController");
const {
  createParent,
  getParent,
  updateParent,
  deleteParent,
  getAllParent,
} = require("../controllers/Admin/parentController");
const {
  createManager,
  getManager,
  updateManager,
  deleteManager,
  getAllManager,
} = require("../controllers/Admin/managerController");
const {
  createAdmin,
  getAdmin,
  updateAdmin,
  deleteAdmin,
  getAllAdmin,
} = require("../controllers/Admin/adminController");
const {
  createSchedule,
  deleteSchedule,
  updateSchedule,
  getSchedule,
  getAllSchedule,
} = require("../controllers/Admin/scheduleController");

const {
  createGradeSubjectSemester,
  deleteGradeSubjectSemester,
  updateGradeSubjectSemester,
  getGradeSubjectSemester,
  getAllGradeSubjectSemesters,
} = require("../controllers/Admin/gradeSubjectSemester");

const {
  createClass,
  updateClass,
  deleteClass,
  getClass,
  getAllClasses,
} = require("../controllers/Admin/classController");

const {
  createStudent,
  updateStudent,
  deleteStudent,
  getStudent,
  getAllStudents,
} = require("../controllers/Admin/studentController");
const {
  createGradeYear,
  getGradeYear,
  updateGradeYear,
  deleteGradeYear,
  getAllGradeYear,
} = require("../controllers/Admin/gradeYearController");
const {
  createParentStudent,
  deleteParentStudent,
  getParentsStudent,
  updateParentStudent,
  getAllParentsStudent,
} = require("../controllers/Admin/parentStudentController");
const {
  seedRewards,
} = require("../controllers/General/rewardCatalogDataController");
const {
  login,
  updateAdminProfile,
} = require("../controllers/auth/authAdminController");
const { getLoggedInAdminData } = require("../controllers/Admin/adminData");
const {
  getTeacherClassesForCurrentSemester,
  getAllTeacherClasses,
  getClassTeacherById,
} = require("../controllers/Teacher/getAllClasses");

const router = express.Router();
router.post("/login", login);

router.patch(
  "/admin-profile",
  validateJwt,

  uploadImage.single("profileImage"),
  (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ error: err.message });
    } else if (err) {
      return res.status(400).json({ error: err.message });
    }
    next();
  },
  updateAdminProfile
);

//academic year routes
router.post(
  "/academicYear/createAcademicYear",
  validateJwt,

  createAcademicYear
);
router
  .route("/academicYear/:id")
  .get(validateJwt, getAcademicYear)
  .patch(validateJwt, updateAcademicYear)
  .delete(validateJwt, deleteAcademicYear);
router.get("/academicYear", validateJwt, getAllAcademicYear);

//grade routes
router.post("/grade/createGrade", validateJwt, createGrade);
router
  .route("/grade/:id")
  .get(validateJwt, getGrade)
  .patch(validateJwt, updateGrade)
  .delete(validateJwt, deleteGrade);
router.get("/grade", validateJwt, getAllGrade);

//subject routes
router.post(
  "/subject/createSubject",
  validateJwt,

  createSubject
);
router
  .route("/subject/:id")
  .get(validateJwt, getSubject)
  .patch(validateJwt, updateSubject)
  .delete(validateJwt, deleteSubject);
router.get("/subject", validateJwt, getAllSubject);

//semester routes
router.post(
  "/semester/createSemester",
  validateJwt,

  createSemester
);
router
  .route("/semester/:id")
  .get(validateJwt, getSemester)
  .patch(validateJwt, updateSemester)
  .delete(validateJwt, deleteSemester);
router.get("/semester", validateJwt, getAllSemester);

//Grade Subjects Semester Routes
router.post(
  "/gradeSubjectSemester/createGradeSubjectSemester",
  validateJwt,

  createGradeSubjectSemester
);
router
  .route("/gradeSubjectSemester/:id")
  .get(validateJwt, getGradeSubjectSemester)
  .patch(validateJwt, updateGradeSubjectSemester)
  .delete(validateJwt, deleteGradeSubjectSemester);
router.get(
  "/gradeSubjectSemester",
  validateJwt,

  getAllGradeSubjectSemesters
);

// class Routes
router.post("/class/createClass", validateJwt, createClass);
router
  .route("/class/:id")
  .get(validateJwt, getClass)
  .patch(validateJwt, updateClass)
  .delete(validateJwt, deleteClass);
router.get("/class", validateJwt, getAllClasses);

//student Routes
router.post(
  "/student/createStudent",
  validateJwt,

  createStudent
);
router
  .route("/student/:id")
  .get(validateJwt, getStudent)
  .patch(validateJwt, updateStudent)
  .delete(validateJwt, deleteStudent);
router.get("/student", validateJwt, getAllStudents);

//Grade Subjects Semester Routes
router.post(
  "/gradeSubjectSemester/createGradeSubjectSemester",
  validateJwt,

  createGradeSubjectSemester
);

//grade-year routes
router.post(
  "/gradeYear/createGradeYear",
  validateJwt,

  createGradeYear
);
router
  .route("/gradeYear/:id")
  .get(validateJwt, getGradeYear)
  .patch(validateJwt, updateGradeYear)
  .delete(validateJwt, deleteGradeYear);
router.get("/gradeYear", validateJwt, getAllGradeYear);
router
  .route("/gradeSubjectSemester/:id")
  .get(validateJwt, getGradeSubjectSemester)
  .patch(validateJwt, updateGradeSubjectSemester)
  .delete(validateJwt, deleteGradeSubjectSemester);
router.get(
  "/gradeSubjectSemester",
  validateJwt,

  getAllGradeSubjectSemesters
);

// class Routes
router.post("/class/createClass", validateJwt, createClass);
router
  .route("/class/:id")
  .get(validateJwt, getClass)
  .patch(validateJwt, updateClass)
  .delete(validateJwt, deleteClass);
router.get("/class", validateJwt, getAllClasses);

//student Routes
router.post(
  "/student/createStudent",
  validateJwt,

  createStudent
);
router
  .route("/student/:id")
  .get(validateJwt, getStudent)
  .patch(validateJwt, updateStudent)
  .delete(validateJwt, deleteStudent);
router.get("/student", validateJwt, getAllStudents);

//teacher routes
router.post(
  "/teacher/createTeacher",
  validateJwt,

  createTeacher
);
router
  .route("/teacher/:id")
  .get(validateJwt, getTeacher)
  .patch(validateJwt, updateTeacher)
  .delete(validateJwt, deleteTeacher);
router.get("/teacher", validateJwt, getAllTeacher);

//class-teacher routes
router.post(
  "/classTeacher/createClassTeacher",
  validateJwt,
  createClassTeacher
);
router
  .route("/classTeacher/:id")
  .get(validateJwt, getClassTeacher)
  .patch(validateJwt, updateClassTeacher)
  .delete(validateJwt, deleteClassTeacher);
router.get("/classTeacher", validateJwt, getAllClassTeacher);
router.get(
  "/currentTeacherClasses/:teacherId",
  validateJwt,
  getTeacherClassesForCurrentSemester
);
router.get("/allTeacherClasses/:teacherId", validateJwt, getAllTeacherClasses);
router.get("/classTeacher/:id", validateJwt, getClassTeacherById);
//parent routes
router.post("/parent/createParent", validateJwt, createParent);
router
  .route("/parent/:id")
  .get(validateJwt, getParent)
  .patch(validateJwt, updateParent)
  .delete(validateJwt, deleteParent);
router.get("/parent", validateJwt, getAllParent);
//parent-student routes
router.delete(
  "/parentStudent/:id",
  validateJwt,

  deleteParentStudent
);
//manager routes
router.post(
  "/manager/createManager",
  validateJwt,

  createManager
);
router
  .route("/manager/:id")
  .get(validateJwt, getManager)
  .patch(validateJwt, updateManager)
  .delete(validateJwt, deleteManager);
router.get("/manager", validateJwt, getAllManager);

//admin routes
router.post("/admin/createAdmin", validateJwt, createAdmin);
router
  .route("/admin/:id")
  .get(validateJwt, getAdmin)
  .patch(validateJwt, updateAdmin)
  .delete(validateJwt, deleteAdmin);
router.get("/admin", validateJwt, getAllAdmin);

//schedule routes
router.post(
  "/schedule/createSchedule",
  validateJwt,

  createSchedule
);

router
  .route("/schedule/:id")
  .get(validateJwt, getSchedule)
  .patch(validateJwt, updateSchedule)
  .delete(validateJwt, deleteSchedule);
router.get("/schedule", validateJwt, getAllSchedule);
router.post("/reward", validateJwt, seedRewards);
router.get("/admin-data", validateJwt, getLoggedInAdminData);
module.exports = router;
