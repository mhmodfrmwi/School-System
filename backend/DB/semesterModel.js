const semesterSchema = new mongoose.Schema({
  semester_name: { type: String, required: true },
  academic_year_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "AcademicYear",
    required: true,
  },
});

module.exports = mongoose.model("Semester", semesterSchema);
