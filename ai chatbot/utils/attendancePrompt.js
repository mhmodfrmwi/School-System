const aiService = require("../services/aiService");
const attendanceService = require("../services/attendanceService");
const attendancePrompt = async (message, authToken, userId) => {
  let systemPrompt = aiService.createSystemPrompt(message);
  const attendance = await attendanceService.fetchStudentAttendance(
    userId,
    authToken
  );
  systemPrompt = aiService.createSystemPrompt(message, attendance);
  return systemPrompt;
};
module.exports = attendancePrompt;
