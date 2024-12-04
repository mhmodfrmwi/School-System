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
  CreateSchedual,
  CreateTerm,
  CreateCourse,
  GetAllCourses,
  GetAllTerms,
  GetAllSchedual,
  GetOneCourse,
  GetOneTerm,
  GetOneSchedual,
  UpdateSchedual,
  UpdateTerm,
  UpdateCourse,
  DeleteSchedual,
  DeleteTerm,
  DeleteCourse,
} = require("../controllers/Admin/AdminControllers");
const usersRouter = express.Router();
const mainRouter = express.Router();
usersRouter.get("/admins", GetaAdmins);
usersRouter.get("/students", GetStudents);
usersRouter.get("/parents", GetParents);
usersRouter.get("/bosses", GetBosses);
usersRouter.get("/teachers", GetTeachers);

usersRouter
  .route("/students/:id")
  .get(GetOneStudent)
  .put(UpdateStudent)
  .delete(DeleteStudent);
usersRouter
  .route("/teachers/:id")
  .get(GetOneTeacher)
  .put(UpdateTeacher)
  .delete(DeleteTeacher);
usersRouter
  .route("/admins/:id")
  .get(GetOneAdmin)
  .put(UpdateAdmin)
  .delete(DeleteAdmin);
usersRouter
  .route("/parents/:id")
  .get(GetOneParent)
  .put(UpdateParent)
  .delete(DeleteParent);
usersRouter
  .route("/bosses/:id")
  .get(GetOneBoss)
  .put(UpdateBoss)
  .delete(DeleteBoss);
mainRouter.post("/addSchedual", CreateSchedual);
mainRouter.post("/addTerm", CreateTerm);
mainRouter.post("/addCourse", CreateCourse);
mainRouter.get("/courses", GetAllCourses);
mainRouter.get("/terms", GetAllTerms);
mainRouter.get("/scheduals", GetAllSchedual);
mainRouter
  .route("/courses/:id")
  .get(GetOneCourse)
  .put(UpdateCourse)
  .delete(DeleteCourse);
mainRouter
  .route("/terms/:id")
  .get(GetOneTerm)
  .put(UpdateTerm)
  .delete(DeleteTerm);
mainRouter
  .route("/scheduals/:id")
  .get(GetOneSchedual)
  .put(UpdateSchedual)
  .delete(DeleteSchedual);
module.exports = {
  usersRouter,
  mainRouter,
};
