const Exam = require("../models/Exam");

const createExam = async (examData) => {
  const exam = new Exam(examData);
  await exam.save();
  return exam;
};

module.exports = { createExam };
