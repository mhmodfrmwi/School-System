const axios = require("axios");
const SCHOOL_API_BASE = process.env.SCHOOL_API_URL || "http://localhost:4000";
const cacheManager = require("../utils/cacheManager");
/**
 * Fetch student attendance from the school API
 * @param {string} userId - Student ID
 * @param {string} authToken - Authentication token
 * @returns {Array|null} - Attendance data or null if error
 */

const fetchStudentAttendance = async (userId, authToken) => {
  try {
    const cacheKey = `attendance-${userId}-${authToken.substring(0, 10)}`;
    const cachedAttendance = cacheManager.get(cacheKey);
    if (cachedAttendance) {
      return cachedAttendance;
    }
    const response = await axios.get(
      `${SCHOOL_API_BASE}/api/v1/student/getAttendanceForChatbot`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        timeout: 20000,
      }
    );
    if (response.status !== 200) {
      throw new Error("Failed to fetch attendance");
    }

    const attendance = response.data;
    cacheManager.set(cacheKey, attendance);
    return attendance;
  } catch (error) {
    console.error(
      "Failed to fetch attendance:",
      error.response?.data || error.message
    );
    return null;
  }
};
module.exports = {
  fetchStudentAttendance,
};
