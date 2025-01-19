const attendanceSchema = new mongoose.Schema({
  student_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  academic_number: { type: String, required: true }, // Add academic number
  class_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Class",
    required: true,
  },
  date: { type: Date, required: true },
  status: { type: String, enum: ["P", "A", "L"], required: true }, // P: Present, A: Absent, L: Late
});

module.exports = mongoose.model("Attendance", attendanceSchema);
