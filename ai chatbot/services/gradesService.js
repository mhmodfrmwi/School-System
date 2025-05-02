const axios = require("axios");
const SCHOOL_API_BASE = process.env.SCHOOL_API_URL || "http://localhost:4000";
const cacheManager = require("../utils/cacheManager");
/**
 * Fetch student grades from the school API
 * @param {string} userId - Student ID
 * @param {string} authToken - Authentication token
 * @returns {Array|null} - Grades data or null if error
 */
const fetchStudentGrades = async (userId, authToken) => {
  try {
    const cacheKey = `grades-${userId}-${authToken.substring(0, 10)}`;
    const cachedGrades = cacheManager.get(cacheKey);
    if (cachedGrades) {
      return cachedGrades;
    }
    const response = await axios.get(
      `${SCHOOL_API_BASE}/api/v1/student/semester-subject-degree`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        timeout: 20000,
      }
    );

    const grades = response.data;
    cacheManager.set(cacheKey, grades);
    return grades;
  } catch (error) {
    console.error(
      "Failed to fetch grades:",
      error.response?.data || error.message
    );
    return null;
  }
};
module.exports = {
  fetchStudentGrades,
};
