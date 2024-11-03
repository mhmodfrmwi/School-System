const asyncHandler = require("express-async-handler");
const AdminRegister = require("./Register/adminRegister");
const ParentRegister = require("./Register/parentRegister");
const StudentRegister = require("./Register/studentRegister");
const TeacherRegister = require("./Register/teacherRegister");
const BossRegister = require("./Register/bossRegisteration");

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
  res.json({ message: "you logged in successfully" });
});
module.exports = {
  Login,
  Register,
};
