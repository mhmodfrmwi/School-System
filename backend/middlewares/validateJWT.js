const jwt = require("jsonwebtoken");
const validateJwt = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      status: 401,
      message: "Token is required!",
    });
  }
  console.log(token);
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({
        status: 403,
        message: "Invalid token!",
      });
    }
    if (!user) {
      return res.status(401).json({
        status: 401,
        message: "User not found!",
      });
    }
    req.user = user;
    console.log(req.user);
    next();
  });
};
module.exports = validateJwt;
