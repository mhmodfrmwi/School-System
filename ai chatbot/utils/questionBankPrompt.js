const aiService = require("../services/aiService");
const questionBankService = require("../services/questionBankService");
const questionBankPrompt = async (message, authToken, userId) => {
  let systemPrompt = aiService.createSystemPrompt(message);
  const questionBank = await questionBankService.fetchQuestionBank(
    userId,
    authToken
  );
  systemPrompt = aiService.createSystemPrompt(message, questionBank);
  return systemPrompt;
};
module.exports = questionBankPrompt;
