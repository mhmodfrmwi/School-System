const mongoose = require("mongoose");
const examQuestionSchema = new mongoose.Schema({
  question_text: {
    type: "String",
    required: [true, "Question text is required"],
    trim: true,
  },
  question_type: {
    type: "String",
    required: [true, "Question type is required"],
    enum: ["MCQ", "True/False", "Essay"],
  },
  options: {
    type: ["String"],
    required: function () {
      return this.question_type === "MCQ";
    },
  },
  correct_answer: {
    type: "String",
    required: function () {
      return this.question_type !== "Essay";
    },
  },
  marks: {
    type: "Number",
    required: [true, "Marks are required"],
    min: 0,
  },
});

const ExamQuestion = mongoose.model("ExamQuestion", examQuestionSchema);

module.exports = ExamQuestion;
