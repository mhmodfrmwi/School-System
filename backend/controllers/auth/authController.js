const asyncHandler = require("express-async-handler");
const AdminRegister = require("./Register/adminRegister");
const ParentRegister = require("./Register/parentRegister");
const StudentRegister = require("./Register/studentRegister");
const TeacherRegister = require("./Register/teacherRegister");
const BossRegister = require("./Register/bossRegisteration");
const AdminLogin = require("./Login/AdminLogin");
const BossLogin = require("./Login/BossLogin");
const ParentLogin = require("./Login/ParentLogin");
const StudentLogin = require("./Login/StudentLogin");
const TeacherLogin = require("./Login/TeacherLogin");

const Register = asyncHandler(async (req, res) => {
  if (!req.body.role) {
    return res.json({ message: "Role is required" });
  }
  const role = req.body.role;
  switch (role) {
    case "Admin":
      AdminRegister(req, res);
      break;
    case "Parent":
      ParentRegister(req, res);
      break;
    case "Student":
      StudentRegister(req, res);
    case "Teacher":
      TeacherRegister(req, res);
      break;
    case "Boss":
      BossRegister(req, res);
      break;
    default:
      break;
  }
});

const Login = asyncHandler(async (req, res) => {
  const role = req.body.role;
  switch (role) {
    case "Admin":
      AdminLogin(req, res);
      break;
    case "Parent":
      ParentLogin(req, res);
      break;
    case "Student":
      StudentLogin(req, res);
    case "Teacher":
      TeacherLogin(req, res);
      break;
    case "Boss":
      BossLogin(req, res);
      break;
    default:
      break;
  }
});
module.exports = {
  Login,
  Register,
};
