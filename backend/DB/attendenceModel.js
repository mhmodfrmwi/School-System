const mongoose = require("mongoose");
const attendanceSchema = new mongoose.Schema(
  {
    student_id: {
      type: "ObjectId",
      ref: "Student",
      required: true,
    },
    academic_number: { type: "String", required: true },
    class_id: {
      type: "ObjectId",
      ref: "Class",
      required: true,
    },
    date: { type: "Date", required: true },
    status: { type: "String", enum: ["P", "A"], required: true }, // P: Present, A: Absent,
  },
  { timestamps: true }
);
const Attendance = mongoose.model("Attendance", attendanceSchema);
module.exports = Attendance;
