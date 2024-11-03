const asyncHandler = require("express-async-handler");
const Login = asyncHandler(async (req, res) => {
  res.json({ message: "you logged in successfully" });
});
const Register = asyncHandler(async (req, res) => {
  res.json({ message: "you registerd in successfully" });
});

module.exports = {
  Login,
  Register,
};
