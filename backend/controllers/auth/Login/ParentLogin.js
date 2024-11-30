const asyncHandler = require("express-async-handler");
const { Parent } = require("../../../DB/Parent");
const bcrypt = require("bcrypt");

const ParentLogin = asyncHandler(async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const parent = await Parent.findOne({ email: email });
  if (!parent) {
    return res.json({
      status: 404,
      message: "User not found",
    });
  }

  const comparedPassword = await bcrypt.compare(password, parent.password);
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
module.exports = ParentLogin;
