const asyncHandler = require("express-async-handler");
const { isArabic } = require("../utils/languageDetector");
const scheduleService = require("../services/scheduleService");
const aiService = require("../services/aiService");

/**
 * Process chat message and return AI response
 * @route POST /api/chat
 * @access Private
 */
const processMessage = asyncHandler(async (req, res) => {
  const { message, userId } = req.body;
  const authToken = req.authToken;

  if (!message || !userId) {
    res.status(400);
    throw new Error(
      isArabic(message)
        ? "الرسالة ومعرف المستخدم مطلوبان"
        : "Message and userId are required"
    );
  }

  const schedules = await scheduleService.fetchStudentSchedule(
    userId,
    authToken
  );

  const scheduleData = {
    schedule: scheduleService.organizeScheduleByDay(schedules),
    academicInfo: scheduleService.getAcademicInfo(schedules),
  };

  const systemPrompt = aiService.createSystemPrompt(message, scheduleData);

  const aiResponse = await aiService.getAIResponse(message, systemPrompt);

  res.status(200).json({
    success: true,
    reply: aiResponse,
  });
});

module.exports = {
  processMessage,
};
