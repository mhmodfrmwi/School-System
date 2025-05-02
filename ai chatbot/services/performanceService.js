const axios = require("axios");
const SCHOOL_API_BASE = process.env.SCHOOL_API_URL || "http://localhost:4000";
const cacheManager = require("../utils/cacheManager");

/**
 * Fetch performance data from the school API with improved error handling and logging
 * @param {string} userId - Student ID
 * @param {string} authToken - Authentication token
 * @param {number} cacheTime - Optional time in seconds to cache results (default: 3600)
 * @returns {Promise<Object|null>} - Performance data or null if error
 */
const fetchPerformance = async (authToken, userId, cacheTime = 3600) => {
  if (!userId || !authToken) {
    console.error("Missing required parameters: userId or authToken");
    return null;
  }

  try {
    const cacheKey = `performance-${userId}-${authToken.substring(0, 10)}`;
    const cachedPerformance = cacheManager.get(cacheKey);

    if (cachedPerformance) {
      console.log(`Cache hit for performance data: ${userId}`);
      return cachedPerformance;
    }

    console.log(`Fetching performance data for user: ${userId}`);
    const response = await axios.get(`${SCHOOL_API_BASE}/api/v1/ML/modelData`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
      timeout: 8000,
    });

    if (response.status !== 200) {
      throw new Error("Failed to fetch performance");
    }

    let performance = response.data;

    console.log(`Successfully fetched performance data for user: ${userId}`);

    if (!performance || typeof performance !== "object") {
      throw new Error("Invalid performance data structure");
    }

    cacheManager.set(cacheKey, performance, cacheTime);

    return performance;
  } catch (error) {
    const errorContext = {
      userId,
      endpoint: `${SCHOOL_API_BASE}/api/v1/ML/modelData`,
      statusCode: error.response?.status,
      errorCode: error.code,
      message: error.message,
    };

    console.error("Failed to fetch performance data:", errorContext);

    if (error.code === "ECONNABORTED" || error.code === "ECONNREFUSED") {
      console.log("Network error occurred, consider implementing retry logic");
    }

    return null;
  }
};

module.exports = {
  fetchPerformance,
};
