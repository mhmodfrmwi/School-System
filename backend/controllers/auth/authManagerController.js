const expressAsyncHandler = require("express-async-handler");
const signToken = require("../../utils/signToken");
const Manager = require("../../DB/managerModel");
const login = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      status: 400,
      message: "Please provide email and password!",
    });
  }
  const manager = await Manager.findOne({ email }).select("+password");
  if (
    !manager ||
    !(await manager.comparePasswordInDb(password, manager.password))
  ) {
    return res.status(401).json({
      status: 401,
      message: "Incorrect email or password",
    });
  }
  const token = signToken(manager._id, manager.email, "manager");
  res.status(200).json({
    status: 200,
    message: "Logged in successfully",
    token,
    manager,
  });
});
module.exports = { login };
