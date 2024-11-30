const asyncHandler = require("express-async-handler");
const { Boss } = require("../../../DB/Boss");
const bcrypt = require("bcrypt");

const BossLogin = asyncHandler(async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const boss = await Boss.findOne({ email: email });
  if (!boss) {
    return res.json({
      status: 404,
      message: "User not found",
    });
  }

  const comparedPassword = await bcrypt.compare(password, boss.password);
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
module.exports = BossLogin;
