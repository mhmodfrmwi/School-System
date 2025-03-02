const mongoose = require("mongoose");

const examResultSchema = new mongoose.Schema({
  student_id: {
    type: "ObjectId",
    ref: "Student",
    required: true,
  },
  exam_id: {
    type: "ObjectId",
    ref: "Exam",
    required: true,
  },
  total_marks: {
    type: "Number",
    required: true,
  },
  percentage: {
    type: "Number",
    required: true,
  },
  status: {
    type: "String",
    enum: ["Pass", "Fail"],
    default: "Fail",
    required: true,
  },
});

const ExamResult = mongoose.model("ExamResult", examResultSchema);

module.exports = ExamResult;
