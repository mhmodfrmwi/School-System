const validateTeacher = (req, res, next) => {
  const role = req.user.role;
  if (role !== "teacher" && role !== "admin") {
    return res.status(403).json({
      status: 403,
      message: "Unauthorized to access this route",
    });
  }
  next();
};
module.exports = validateTeacher;
