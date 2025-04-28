const aiService = require("../services/aiService");
const subjectsService = require("../services/subjectsService");
const subjectsPrompt = async (message, authToken, userId) => {
  let systemPrompt = aiService.createSystemPrompt(message);
  const subjectsData = await subjectsService.fetchStudentSubjects(
    userId,
    authToken
  );
  systemPrompt = aiService.createSystemPrompt(message, subjectsData);
  return systemPrompt;
};
module.exports = subjectsPrompt;
