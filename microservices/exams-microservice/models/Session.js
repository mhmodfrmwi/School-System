const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
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
  start_time: { type: "Date", required: true },
  end_time: { type: "Date" },
  status: {
    type: String,
    enum: ["Not Submitted", "Submitted"],
  },
});

sessionSchema.virtual("available_time").get(function () {
  if (!this.end_time) {
    return 0;
  }
  const now = Date.now();
  const endTime = this.end_time.getTime();
  return now < endTime ? endTime - now : 0;
});
sessionSchema.virtual("session_status").get(function () {
  if (!this.end_time) {
    return "Not Started";
  }
  const now = Date.now();
  const endTime = this.end_time.getTime();
  return now < endTime ? "In Progress" : "Expired";
});

sessionSchema.set("toJSON", { virtuals: true });

const Session = mongoose.model("Session", sessionSchema);
module.exports = Session;
