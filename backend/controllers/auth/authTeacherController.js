const expressAsyncHandler = require("express-async-handler");
const signToken = require("../../utils/signToken");
const Teacher = require("../../DB/teacher");

const login = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      status: 400,
      message: "Please provide email and password!",
    });
  }
  const teacher = await Teacher.findOne({ email }).select("+password");
  if (
    !teacher ||
    !(await teacher.comparePasswordInDb(password, teacher.password))
  ) {
    return res.status(401).json({
      status: 401,
      message: "Incorrect email or password",
    });
  }
  const token = signToken(teacher._id, teacher.email, "teacher");
  res.status(200).json({
    status: 200,
    message: "Logged in successfully",
    token,
    teacher,
  });
});
module.exports = login;
