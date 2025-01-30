const mongoose = require("mongoose");
const attendanceSchema = new mongoose.Schema(
  {
    student_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    academic_number: { type: String, required: true },
    class_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
      required: true,
    },
    date: { type: Date, required: true },
    status: { type: String, enum: ["P", "A", "L"], required: true }, // P: Present, A: Absent, L: Late
  },
  { timestamps: true }
);
const Attendance = mongoose.model("Attendance", attendanceSchema);
module.exports = Attendance;
