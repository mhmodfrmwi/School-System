const aiService = require("../services/aiService");
const scheduleService = require("../services/scheduleService");
const schedulePrompt = async (message, authToken, userId) => {
  let systemPrompt = aiService.createSystemPrompt(message);
  const schedules = await scheduleService.fetchStudentSchedule(
    userId,
    authToken
  );

  const scheduleData = {
    schedule: scheduleService.organizeScheduleByDay(schedules),
    academicInfo: scheduleService.getAcademicInfo(schedules),
  };
  systemPrompt = aiService.createSystemPrompt(message, scheduleData);
  return systemPrompt;
};
module.exports = schedulePrompt;
