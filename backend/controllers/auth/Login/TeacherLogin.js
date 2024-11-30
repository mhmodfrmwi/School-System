const asyncHandler = require("express-async-handler");
const { Teacher } = require("../../../DB/teacher");
const bcrypt = require("bcrypt");

const TeacherLogin = asyncHandler(async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const teacher = await Teacher.findOne({ email: email });
  if (!teacher) {
    return res.json({
      status: 404,
      message: "User not found",
    });
  }

  const comparedPassword = await bcrypt.compare(password, teacher.password);
  if (!comparedPassword) {
    return res.json({
      status: 400,
      message: "email or password is not correct",
    });
  }

  res.json({
    status: 200,
    message: "You logged in successfully",
  });
});
module.exports = TeacherLogin;
