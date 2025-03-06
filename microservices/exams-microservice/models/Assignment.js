const mongoose = require("mongoose");

const assignmentSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  due_date: { type: Date, required: true },
  created_by: { type: "ObjectId", ref: "Teacher" },
  subject_id: { type: mongoose.Schema.Types.Object, ref: "Subject" },
  class_id: { type: "ObjectId", ref: "Class" },
  grade_id: { type: "ObjectId", ref: "Grade" },
  academic_year_id: {
    type: "ObjectId",
    ref: "AcademicYear",
  },
  semester_id: { type: "ObjectId", ref: "Semester" },
  total_marks: { type: "Number", required: true },
});

const Assignment = mongoose.model("Assignment", assignmentSchema);

module.exports = Assignment;
