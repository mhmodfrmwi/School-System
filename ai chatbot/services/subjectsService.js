const axios = require("axios");
const SCHOOL_API_BASE = process.env.SCHOOL_API_URL || "http://localhost:4000";
const cacheManager = require("../utils/cacheManager");

/**
 * Fetch student subjects from the school API with optional filtering
 * @param {string} userId - Student ID
 * @param {string} authToken - Authentication token
 * @param {Object} [filters] - Optional filters for subjects
 * @param {string} [filters.subjectName] - Filter by subject name
 * @param {string} [filters.gradeName] - Filter by grade name
 * @param {string} [filters.academicYear] - Filter by academic year
 * @param {string} [filters.semesterName] - Filter by semester name
 * @returns {Array|null} - Filtered subjects data or null if error
 */
const fetchStudentSubjects = async (userId, authToken, filters = {}) => {
  try {
    const cacheKey = `subjects-${userId}-${authToken.substring(0, 10)}`;
    const cachedSubjects = cacheManager.get(cacheKey);

    if (cachedSubjects) {
      return applyFilters(cachedSubjects, filters);
    }

    const response = await axios.get(
      `${SCHOOL_API_BASE}/api/v1/student/get-subjects`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        timeout: 8000,
      }
    );

    const subjects = response.data.subjects;
    cacheManager.set(cacheKey, subjects);

    return applyFilters(subjects, filters);
  } catch (error) {
    console.error(
      "Failed to fetch subjects:",
      error.response?.data || error.message
    );
    return null;
  }
};

/**
 * Apply filters to subjects array
 * @param {Array} subjects - Array of subject objects
 * @param {Object} filters - Filter criteria
 * @returns {Array} - Filtered array of subjects
 */
const applyFilters = (subjects, filters) => {
  if (!filters || Object.keys(filters).length === 0) {
    return subjects;
  }

  return subjects.filter((subject) => {
    return Object.entries(filters).every(([key, value]) => {
      if (typeof subject[key] === "string" && typeof value === "string") {
        return subject[key].toLowerCase().includes(value.toLowerCase());
      }
      return subject[key] === value;
    });
  });
};

module.exports = {
  fetchStudentSubjects,
};
