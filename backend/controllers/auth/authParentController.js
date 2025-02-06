const expressAsyncHandler = require("express-async-handler");
const signToken = require("../../utils/signToken");
const Parent = require("../../DB/Parent");
const login = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      status: 400,
      message: "Please provide email and password!",
    });
  }
  const parent = await Parent.findOne({ email }).select("+password");
  if (
    !parent ||
    !(await parent.comparePasswordInDb(password, parent.password))
  ) {
    return res.status(401).json({
      status: 401,
      message: "Incorrect email or password",
    });
  }
  const token = signToken(parent._id, parent.email, "parent");
  res.status(200).json({
    status: 200,
    message: "Logged in successfully",
    token,
    parent,
  });
});

module.exports = {
  login,
};
