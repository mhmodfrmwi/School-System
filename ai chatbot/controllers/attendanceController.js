const attendanceService = require("../services/attendanceService");
const apiResponse = require("../utils/apiResponse");
/**
 * Get student attendance
 * @route GET /api/attendance
 * @access Private
 */
const getAttendance = async (req, res) => {
  try {
    const { userId, authToken } = req.user;
    const attendanceData = await attendanceService.fetchStudentAttendance(
      userId,
      authToken
    );
    if (!attendanceData) {
      return apiResponse.error(res, 404, "Grades not found");
    }
    return apiResponse.success(res, 200, "Attendance fetched successfully", {
      attendanceData,
    });
  } catch (error) {
    console.error("Error fetching attendance:", error);
    return apiResponse.error(res, 500, "Internal server error");
  }
};
module.exports = {
  getAttendance,
};
