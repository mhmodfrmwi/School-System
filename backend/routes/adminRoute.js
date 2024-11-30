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
  UpdateStudent,
  UpdateTeacher,
  UpdateAdmin,
  UpdateParent,
  UpdateBoss,
  DeleteStudent,
  DeleteTeacher,
  DeleteAdmin,
  DeleteParent,
  DeleteBoss,
} = require("../controllers/Admin/AdminControllers");
const router = express.Router();

router.get("/admins", GetaAdmins);
router.get("/students", GetStudents);
router.get("/parents", GetParents);
router.get("/bosses", GetBosses);
router.get("/teachers", GetTeachers);

router
  .route("/students/:id")
  .get(GetOneStudent)
  .put(UpdateStudent)
  .delete(DeleteStudent);
router
  .route("/teachers/:id")
  .get(GetOneTeacher)
  .put(UpdateTeacher)
  .delete(DeleteTeacher);
router
  .route("/admins/:id")
  .get(GetOneAdmin)
  .put(UpdateAdmin)
  .delete(DeleteAdmin);
router
  .route("/parents/:id")
  .get(GetOneParent)
  .put(UpdateParent)
  .delete(DeleteParent);
router.route("/bosses/:id").get(GetOneBoss).put(UpdateBoss).delete(DeleteBoss);

module.exports = router;
