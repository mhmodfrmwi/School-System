const axios = require("axios");
const { isArabic } = require("./languageDetector");
const { createSystemPrompt } = require("../services/aiService");
const { fetchPerformance } = require("../services/performanceService");

/**
 * Creates a performance prompt for the AI
 * @param {string} message - User message
 * @param {string} authToken - Authentication token
 * @param {string} userId - User ID
 * @returns {Promise<string>} - System prompt
 */
const performancePrompt = async (message, authToken, userId) => {
  try {
    const messageIsArabic = isArabic(message);
    const performanceData = await fetchPerformance(authToken, userId);
    console.log(performanceData);

    let formattedData = performanceData || {};
    let queryType = "general";

    const lowerMessage = message.toLowerCase();

    if (
      lowerMessage.includes("gpa") ||
      (messageIsArabic && lowerMessage.includes("معدل"))
    ) {
      queryType = "gpa";
    } else if (
      lowerMessage.includes("strength") ||
      lowerMessage.includes("good at") ||
      (messageIsArabic &&
        (lowerMessage.includes("قوة") || lowerMessage.includes("جيد في")))
    ) {
      queryType = "strengths";
    } else if (
      lowerMessage.includes("improve") ||
      lowerMessage.includes("weakness") ||
      (messageIsArabic &&
        (lowerMessage.includes("تحسين") || lowerMessage.includes("ضعف")))
    ) {
      queryType = "improvement";
    }

    let assistantRole = "";
    if (messageIsArabic) {
      assistantRole =
        queryType === "general"
          ? "مساعد تعليمي يقدم معلومات دقيقة عن الأداء الأكاديمي"
          : queryType === "gpa"
          ? "مستشار أكاديمي يشرح المعدلات التراكمية وأهميتها"
          : queryType === "strengths"
          ? "مرشد يساعد الطلاب على فهم نقاط قوتهم الأكاديمية"
          : "مدرب تعليمي يقدم نصائح لتحسين المهارات الأكاديمية";
    } else {
      assistantRole =
        queryType === "general"
          ? "an educational assistant providing accurate information about academic performance"
          : queryType === "gpa"
          ? "an academic advisor explaining GPAs and their importance"
          : queryType === "strengths"
          ? "a mentor helping students understand their academic strengths"
          : "an educational coach providing tips for improving academic skills";
    }

    return createSystemPrompt(
      message,
      { performanceData: formattedData },
      {
        assistantRole,
        includeDatetime: true,
      }
    );
  } catch (error) {
    console.error("Error generating performance prompt:", error);
    return createSystemPrompt(
      message,
      {},
      {
        assistantRole: isArabic(message)
          ? "مساعد تعليمي يقدم معلومات عامة"
          : "an educational assistant providing general information",
        includeDatetime: true,
      }
    );
  }
};

module.exports = performancePrompt;
