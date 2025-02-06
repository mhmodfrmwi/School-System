const jwt = require("jsonwebtoken");

const signToken = (id, email, role) => {
  return jwt.sign({ id, email, role }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.LOGIN_EXPIRES,
  });
};
module.exports = signToken;
