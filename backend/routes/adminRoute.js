const express = require("express");
const {
  GetaAdmins,
  GetStudents,
  GetParents,
  GetBosses,
  GetTeachers,
  GetOneStudent,
  GetOneTeacher,
  GetOneAdmin,
  GetOneParent,
  GetOneBoss,
} = require("../controllers/Admin/AdminControllers");
const router = express.Router();

router.get("/admins", GetaAdmins);
router.get("/students", GetStudents);
router.get("/parents", GetParents);
router.get("/bosses", GetBosses);
router.get("/teachers", GetTeachers);

router.get("/students/:id", GetOneStudent);
router.get("/teachers/:id", GetOneTeacher);
router.get("/admins/:id", GetOneAdmin);
router.get("/parents/:id", GetOneParent);
router.get("/bosses/:id", GetOneBoss);

module.exports = router;
