const axios = require("axios");
const SCHOOL_API_BASE = process.env.SCHOOL_API_URL || "http://localhost:4000";
const cacheManager = require("../utils/cacheManager");
/**
 * Fetch question bank from the school API
 * @param {string} userId - Student ID
 * @param {string} authToken - Authentication token
 * @returns {Array|null} - question bank data or null if error
 */
const fetchQuestionBank = async (userId, authToken) => {
  console.log("Fetching question bank for user:", userId);

  try {
    const cacheKey = `question-bank-${userId}-${authToken.substring(0, 10)}`;
    const cachedQuestionBank = cacheManager.get(cacheKey);
    if (cachedQuestionBank) {
      return cachedQuestionBank;
    }
    const response = await axios.get(
      `${SCHOOL_API_BASE}/api/v1/student/questionBank/getAllBankQuestions`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        timeout: 20000,
      }
    );
    console.log("Question bank response:", response.data);

    const questionBank = response.data.questions;
    cacheManager.set(cacheKey, questionBank);
    return questionBank;
  } catch (error) {
    console.error(
      "Failed to fetch question bank:",
      error.response?.data || error.message
    );
    return "Sorry, I couldn't fetch your question bank. Please try again later.";
  }
};
module.exports = { fetchQuestionBank };
