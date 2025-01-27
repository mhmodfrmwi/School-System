const mongoose = require("mongoose");
const gradeSubjectSemesterSchema = new mongoose.Schema({
  grade_subject_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "GradeSubject",
    required: true,
  },
  semester_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Semester",
    required: true,
  },
});
const GradeSubjectSemester = mongoose.model(
  "GradeSubjectSemester",
  gradeSubjectSemesterSchema
);
module.exports = GradeSubjectSemester;
