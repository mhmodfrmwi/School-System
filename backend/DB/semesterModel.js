const mongoose = require("mongoose");
const semesterSchema = new mongoose.Schema({
  semesterName: { type: String, required: true },
  academicYear_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "AcademicYear",
    required: true,
  },
});
const Semester = mongoose.model("Semester", semesterSchema);
module.exports = Semester;
