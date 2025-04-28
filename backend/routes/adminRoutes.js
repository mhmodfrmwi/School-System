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
const { login ,updateAdminProfile} = require("../controllers/auth/authAdminController");
const { getLoggedInAdminData} = require("../controllers/Admin/adminData");

const router = express.Router();
router.post("/login", login);

router.patch(
  "/admin-profile",
  validateJwt,
  validateAdmin,
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
  validateAdmin,
  createAcademicYear
);
router
  .route("/academicYear/:id")
  .get(validateJwt, validateAdmin, getAcademicYear)
  .patch(validateJwt, validateAdmin, updateAcademicYear)
  .delete(validateJwt, validateAdmin, deleteAcademicYear);
router.get("/academicYear", validateJwt, getAllAcademicYear);

//grade routes
router.post("/grade/createGrade", validateJwt, validateAdmin, createGrade);
router
  .route("/grade/:id")
  .get(validateJwt, validateAdmin, getGrade)
  .patch(validateJwt, validateAdmin, updateGrade)
  .delete(validateJwt, validateAdmin, deleteGrade);
router.get("/grade", validateJwt, getAllGrade);

//subject routes
router.post(
  "/subject/createSubject",
  validateJwt,
  validateAdmin,
  createSubject
);
router
  .route("/subject/:id")
  .get(validateJwt, validateAdmin, getSubject)
  .patch(validateJwt, validateAdmin, updateSubject)
  .delete(validateJwt, validateAdmin, deleteSubject);
router.get("/subject", validateJwt, getAllSubject);

//semester routes
router.post(
  "/semester/createSemester",
  validateJwt,
  validateAdmin,
  createSemester
);
router
  .route("/semester/:id")
  .get(validateJwt, validateAdmin, getSemester)
  .patch(validateJwt, validateAdmin, updateSemester)
  .delete(validateJwt, validateAdmin, deleteSemester);
router.get("/semester", validateJwt, getAllSemester);

//Grade Subjects Semester Routes
router.post(
  "/gradeSubjectSemester/createGradeSubjectSemester",
  validateJwt,
  validateAdmin,
  createGradeSubjectSemester
);
router
  .route("/gradeSubjectSemester/:id")
  .get(validateJwt, validateAdmin, getGradeSubjectSemester)
  .patch(validateJwt, validateAdmin, updateGradeSubjectSemester)
  .delete(validateJwt, validateAdmin, deleteGradeSubjectSemester);
router.get(
  "/gradeSubjectSemester",
  validateJwt,
  validateAdmin,
  getAllGradeSubjectSemesters
);

// class Routes
router.post("/class/createClass", validateJwt, validateAdmin, createClass);
router
  .route("/class/:id")
  .get(validateJwt, validateAdmin, getClass)
  .patch(validateJwt, validateAdmin, updateClass)
  .delete(validateJwt, validateAdmin, deleteClass);
router.get("/class", validateJwt, validateAdmin, getAllClasses);

//student Routes
router.post(
  "/student/createStudent",
  validateJwt,
  validateAdmin,
  createStudent
);
router
  .route("/student/:id")
  .get(validateJwt, validateAdmin, getStudent)
  .patch(validateJwt, validateAdmin, updateStudent)
  .delete(validateJwt, validateAdmin, deleteStudent);
router.get("/student", validateJwt, validateAdmin, getAllStudents);

//Grade Subjects Semester Routes
router.post(
  "/gradeSubjectSemester/createGradeSubjectSemester",
  validateJwt,
  validateAdmin,
  createGradeSubjectSemester
);

//grade-year routes
router.post(
  "/gradeYear/createGradeYear",
  validateJwt,
  validateAdmin,
  createGradeYear
);
router
  .route("/gradeYear/:id")
  .get(validateJwt, validateAdmin, getGradeYear)
  .patch(validateJwt, validateAdmin, updateGradeYear)
  .delete(validateJwt, validateAdmin, deleteGradeYear);
router.get("/gradeYear", validateJwt, validateAdmin, getAllGradeYear);
router
  .route("/gradeSubjectSemester/:id")
  .get(validateJwt, validateAdmin, getGradeSubjectSemester)
  .patch(validateJwt, validateAdmin, updateGradeSubjectSemester)
  .delete(validateJwt, validateAdmin, deleteGradeSubjectSemester);
router.get(
  "/gradeSubjectSemester",
  validateJwt,
  validateAdmin,
  getAllGradeSubjectSemesters
);

// class Routes
router.post("/class/createClass", validateJwt, validateAdmin, createClass);
router
  .route("/class/:id")
  .get(validateJwt, validateAdmin, getClass)
  .patch(validateJwt, validateAdmin, updateClass)
  .delete(validateJwt, validateAdmin, deleteClass);
router.get("/class", validateJwt, validateAdmin, getAllClasses);

//student Routes
router.post(
  "/student/createStudent",
  validateJwt,
  validateAdmin,
  createStudent
);
router
  .route("/student/:id")
  .get(validateJwt, validateAdmin, getStudent)
  .patch(validateJwt, validateAdmin, updateStudent)
  .delete(validateJwt, validateAdmin, deleteStudent);
router.get("/student", validateJwt, validateAdmin, getAllStudents);

//teacher routes
router.post(
  "/teacher/createTeacher",
  validateJwt,
  validateAdmin,
  createTeacher
);
router
  .route("/teacher/:id")
  .get(validateJwt, validateAdmin, getTeacher)
  .patch(validateJwt, validateAdmin, updateTeacher)
  .delete(validateJwt, validateAdmin, deleteTeacher);
router.get("/teacher", validateJwt, validateAdmin, getAllTeacher);

//class-teacher routes
router.post(
  "/classTeacher/createClassTeacher",
  validateJwt,
  validateAdmin,
  createClassTeacher
);
router
  .route("/classTeacher/:id")
  .get(validateJwt, validateAdmin, getClassTeacher)
  .patch(validateJwt, validateAdmin, updateClassTeacher)
  .delete(validateJwt, validateAdmin, deleteClassTeacher);
router.get("/classTeacher", validateJwt, validateAdmin, getAllClassTeacher);

//parent routes
router.post("/parent/createParent", validateJwt, validateAdmin, createParent);
router
  .route("/parent/:id")
  .get(validateJwt, validateAdmin, getParent)
  .patch(validateJwt, validateAdmin, updateParent)
  .delete(validateJwt, validateAdmin, deleteParent);
router.get("/parent", validateJwt, validateAdmin, getAllParent);
//parent-student routes
router.delete(
  "/parentStudent/:id",
  validateJwt,
  validateAdmin,
  deleteParentStudent
);
//manager routes
router.post(
  "/manager/createManager",
  validateJwt,
  validateAdmin,
  createManager
);
router
  .route("/manager/:id")
  .get(validateJwt, validateAdmin, getManager)
  .patch(validateJwt, validateAdmin, updateManager)
  .delete(validateJwt, validateAdmin, deleteManager);
router.get("/manager", validateJwt, validateAdmin, getAllManager);

//admin routes
router.post("/admin/createAdmin", validateJwt, validateAdmin, createAdmin);
router
  .route("/admin/:id")
  .get(validateJwt, validateAdmin, getAdmin)
  .patch(validateJwt, validateAdmin, updateAdmin)
  .delete(validateJwt, validateAdmin, deleteAdmin);
router.get("/admin", validateJwt, validateAdmin, getAllAdmin);

//schedule routes
router.post(
  "/schedule/createSchedule",
  validateJwt,
  validateAdmin,
  createSchedule
);

router
  .route("/schedule/:id")
  .get(validateJwt, validateAdmin, getSchedule)
  .patch(validateJwt, validateAdmin, updateSchedule)
  .delete(validateJwt, validateAdmin, deleteSchedule);
router.get("/schedule", validateJwt, validateAdmin, getAllSchedule);
router.post("/reward", validateJwt, validateAdmin, seedRewards);
router.get(
  "/admin-data",validateJwt, validateAdmin,getLoggedInAdminData
);
module.exports = router;
