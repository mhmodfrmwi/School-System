const expressAsyncHandler = require("express-async-handler");
const Student = require("../../DB/student");
const signToken = require("../../utils/signToken");
const login = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check if email and password exist
  if (!email || !password) {
    return res.status(400).json({
      status: 400,
      message: "Please provide email and password!",
    });
  }
  // Check if user exists && password is correct
  const student = await Student.findOne({ email }).select("+password");

  if (
    !student ||
    !(await student.comparePasswordInDb(password, student.password))
  ) {
    return res.status(401).json({
      status: 401,
      message: "Incorrect email or password",
    });
  }

  // If everything ok, send token to client
  const token = signToken(
    student._id,
    student.email,
    "student",
    student.classId
  );

  res.status(200).json({
    status: 200,
    token,
    message: "Login successful",
    student,
  });
});

module.exports = {
  login,
};
