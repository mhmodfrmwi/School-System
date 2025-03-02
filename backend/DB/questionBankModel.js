const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  questionType: {
    type: "String",
    required: true,
    enum: ["MCQ", "True/False", "Short Answer", "Essay"],
  },
  questionText: {
    type: "String",
    required: true,
  },
  subjectId: {
    type: "ObjectId",
    ref: "Subject",
    required: true,
  },
  gradeId: {
    type: "ObjectId",
    ref: "Grade",
    required: true,
  },
  semesterId: {
    type: "ObjectId",
    ref: "Semester",
    required: true,
  },
  teacherId: {
    type: "ObjectId",
    ref: "Teacher",
    required: true,
  },
  answer: {
    type: "String",
    required: true,
  },
  choices: {
    type: ["String"],
    required: function () {
      return this.questionType === "MCQ";
    },
  },
});

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;
