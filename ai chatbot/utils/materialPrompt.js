const aiService = require("../services/aiService");
const materialService = require("../services/materialService");
const materialPrompt = async (message, authToken, userId) => {
  let systemPrompt = aiService.createSystemPrompt(message);
  const materialData = await materialService.fetchSubjectsMaterials(
    userId,
    authToken
  );
  systemPrompt = aiService.createSystemPrompt(message, materialData);
  return systemPrompt;
};
module.exports = materialPrompt;
