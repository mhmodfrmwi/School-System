const asyncHandler = require("express-async-handler");
const { Admin, validateAdmin } = require("../../../DB/Admin");
const bcrypt = require("bcrypt");

const AdminLogin = asyncHandler(async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  let admin = await Admin.findOne({ email: req.body.email });
  if (!admin) {
    return res.json({
      status: 404,
      message: "User not found",
    });
  }

  const comparedPassword = await bcrypt.compare(password, admin.password);
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
module.exports = AdminLogin;
