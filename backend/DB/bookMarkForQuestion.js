const mongoose = require("mongoose");

const bookMarkForQuestionSchema = new mongoose.Schema(
  {
    student_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    question_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
      required: true,
    },
  },
  { timestamps: true }
);

const BookMarkForQuestion = mongoose.model("BookMarkForQuestion", bookMarkForQuestionSchema);

module.exports = BookMarkForQuestion;