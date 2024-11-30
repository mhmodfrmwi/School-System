const asyncHandler = require("express-async-handler");
const { Student } = require("../../../DB/student");
const bcrypt = require("bcrypt");
const StudentLogin = asyncHandler(async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const student = await Student.findOne({ email: email });
  if (!student) {
    return res.json({
      status: 404,
      message: "User not found",
    });
  }

  const comparedPassword = await bcrypt.compare(password, student.password);
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
module.exports = StudentLogin;
