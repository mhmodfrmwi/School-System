const validateManager = (req, res, next) => {
  const role = req.user.role;
  if (role !== "manager" && role !== "Admin") {
    return res.status(403).json({
      status: 403,
      message: "Unauthorized to access this route",
    });
  }
  
  next();
};
module.exports = validateManager;
