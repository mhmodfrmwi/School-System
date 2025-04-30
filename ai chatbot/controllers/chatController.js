const asyncHandler = require("express-async-handler");
const { isArabic } = require("../utils/languageDetector");
const aiService = require("../services/aiService");
const schedulePrompt = require("../utils/schedulePrompt");
const gradesPrompt = require("../utils/gradesPrompt");
const attendancePrompt = require("../utils/attendancePrompt");
const subjectsPrompt = require("../utils/subjectsPrompt");
const materialPrompt = require("../utils/materialPrompt");
const rewardsPrompt = require("../utils/rewardsPrompt");
const questionBankPrompt = require("../utils/questionBankPrompt");
/**
 * Process chat message and return AI response
 * @route POST /api/chat
 * @access Private
 */
const processMessage = asyncHandler(async (req, res) => {
  let { message, userId } = req.body;
  const authToken = req.authToken;

  if (!message || !userId) {
    res.status(400);
    throw new Error(
      isArabic(message)
        ? "الرسالة ومعرف المستخدم مطلوبان"
        : "Message and userId are required"
    );
  }

  const lowerCaseMessage = message.toLowerCase();
  let systemPrompt = aiService.createSystemPrompt(lowerCaseMessage);

  // 1. First check for material-specific keywords
  const materialKeywords = [
    "material",
    "resources",
    "ملفات",
    "مراجع",
    "دروس",
    "فيديو",
    "كتاب",
    "كتب",
    "مرفقات",
    "resources",
  ];

  const isMaterialRequest = materialKeywords.some((keyword) =>
    lowerCaseMessage.includes(keyword)
  );

  // 2. Then check for subject-specific keywords
  const subjectKeywords = ["subject", "مادة", "مواد", "كورس", "مقرر"];

  const isSubjectRequest = subjectKeywords.some(
    (keyword) => lowerCaseMessage.includes(keyword) && !isMaterialRequest // Exclude if already matched as material
  );

  // Handle requests in order of priority
  if (
    lowerCaseMessage.includes("schedule") ||
    lowerCaseMessage.includes("جدول")
  ) {
    systemPrompt = await schedulePrompt(lowerCaseMessage, authToken, userId);
  } else if (
    lowerCaseMessage.includes("grades") ||
    lowerCaseMessage.includes("درجات")
  ) {
    systemPrompt = await gradesPrompt(lowerCaseMessage, authToken, userId);
  } else if (
    lowerCaseMessage.includes("attendance") ||
    lowerCaseMessage.includes("حضور") ||
    lowerCaseMessage.includes("غياب") ||
    lowerCaseMessage.includes("absence")
  ) {
    systemPrompt = await attendancePrompt(lowerCaseMessage, authToken, userId);
  } else if (isMaterialRequest) {
    systemPrompt = await materialPrompt(lowerCaseMessage, authToken, userId);
  } else if (isSubjectRequest) {
    systemPrompt = await subjectsPrompt(lowerCaseMessage, authToken, userId);
  } else if (
    lowerCaseMessage.includes("points") ||
    lowerCaseMessage.includes("reward") ||
    lowerCaseMessage.includes("مكافأة") ||
    lowerCaseMessage.includes("مكافآت") ||
    lowerCaseMessage.includes("نقاط") ||
    lowerCaseMessage.includes("مكافأت") ||
    lowerCaseMessage.includes("جوائز")
  ) {
    systemPrompt = await rewardsPrompt(lowerCaseMessage, authToken, userId);
  } else if (
    lowerCaseMessage.includes("question") ||
    lowerCaseMessage.includes("أسئلة") ||
    lowerCaseMessage.includes("اسئلة") ||
    lowerCaseMessage.includes("سؤال") ||
    lowerCaseMessage.includes("bank") ||
    lowerCaseMessage.includes("بنك")
  ) {
    systemPrompt = await questionBankPrompt(
      lowerCaseMessage,
      authToken,
      userId
    );
  }

  const aiResponse = await aiService.getAIResponse(
    lowerCaseMessage,
    systemPrompt
  );

  res.status(200).json({
    success: true,
    reply: aiResponse,
  });
});

module.exports = {
  processMessage,
};
