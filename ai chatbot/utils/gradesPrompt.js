const aiService = require("../services/aiService");
const gradesService = require("../services/gradesService");
const gradesPrompt = async (message, authToken, userId) => {
  let systemPrompt = aiService.createSystemPrompt(message);
  const grades = await gradesService.fetchStudentGrades(userId, authToken);
  systemPrompt = aiService.createSystemPrompt(message, grades);
  return systemPrompt;
};
module.exports = gradesPrompt;
