const gradesService = require("../services/gradesService");
const apiResponse = require("../utils/apiResponse");
const asyncHandler = require("express-async-handler");

/**
 * Get student grades
 * @route GET /api/grades
 * @access Private
 */
const getGrades = async (req, res) => {
  try {
    const userId = req.query.userId;
    const authToken = req.authToken;

    if (!userId) {
      return apiResponse.error(res, 400, "User ID is required");
    }
    const grades = await gradesService.fetchStudentGrades(userId, authToken);
    if (!grades) {
      return apiResponse.error(res, 404, "Grades not found");
    }
    return apiResponse.success(res, 200, "Grades retrieved successfully", {
      grades,
    });
  } catch (error) {
    console.error("Error fetching grades:", error);
    return apiResponse.error(res, 500, "Internal server error");
  }
};
module.exports = {
  getGrades,
};
