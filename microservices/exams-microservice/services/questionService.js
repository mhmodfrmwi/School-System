const ExamQuestion = require("../models/ExamQuestion");

const createExamQuestions = async (questions) => {
  try {
    const savedQuestions = await ExamQuestion.insertMany(questions);
    return savedQuestions.map((q) => q._id);
  } catch (error) {
    throw new Error("Failed to create questions: " + error.message);
  }
};
module.exports = {
  createExamQuestions,
};
