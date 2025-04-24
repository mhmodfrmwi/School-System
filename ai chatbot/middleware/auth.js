/**
 * Authentication middleware
 * Extracts bearer token from Authorization header
 */
const extractToken = (req, res, next) => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        success: false,
        error: "Authentication token required",
      });
    }
    req.authToken = token;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      error: "Authentication failed",
    });
  }
};

module.exports = { extractToken };
