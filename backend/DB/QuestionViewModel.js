const mongoose = require("mongoose");

const questionViewSchema = new mongoose.Schema({
  question_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question",
    required: true
  },
  student_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true
  },
  is_viewed: {
    type: Boolean,
    default: false
  },
  last_view_at: {
    type: String,
    default: Date.now
  }
}, { timestamps: true });

const QuestionView = mongoose.model("QuestionView", questionViewSchema);
module.exports = QuestionView;