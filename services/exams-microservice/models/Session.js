const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
  student_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  exam_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Exam",
    required: true,
  },
  start_time: { type: Date, required: true },
  end_time: { type: Date },
  status: {
    type: String,
    enum: ["In Progress", "Submitted"],
    default: "In Progress",
  },
});

module.exports = mongoose.model("Session", sessionSchema);
