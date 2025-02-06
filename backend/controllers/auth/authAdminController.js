const expressAsyncHandler = require("express-async-handler");
const signToken = require("../../utils/signToken");
const Admin = require("../../DB/Admin");
const login = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      status: 400,
      message: "Please provide email and password!",
    });
  }
  const admin = await Admin.findOne({ email }).select("+password");
  if (!admin || !(await admin.comparePasswordInDb(password, admin.password))) {
    return res.status(401).json({
      status: 401,
      message: "Incorrect email or password",
    });
  }
  const token = signToken(admin._id, admin.email, "admin");
  res.status(200).json({
    status: 200,
    message: "Logged in successfully",
    token,
    admin,
  });
});

module.exports = {
  login,
};
