/**
 * Get student attendance
 * @route GET /api/attendance
 * @access Private
 */
const getSubjects = async (req, res) => {
  try {
    const { userId, authToken } = req.user;
    const subjectsData = await subjectsService.fetchStudentSubjects(
      userId,
      authToken
    );
    if (!subjectsData) {
      return apiResponse.error(res, 404, "Subjects not found");
    }
    return apiResponse.success(res, 200, "Subjects fetched successfully", {
      subjectsData,
    });
  } catch (error) {
    console.error("Error fetching subjects:", error);
    return apiResponse.error(res, 500, "Internal server error");
  }
};
module.exports = {
  getSubjects,
};
