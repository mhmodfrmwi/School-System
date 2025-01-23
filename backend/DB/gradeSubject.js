const mongoose = require("mongoose");
const gradeSubjectSchema = new mongoose.Schema({
  subjectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subject",
    required: true,
  },
  gradeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Grade",
    required: true,
  },
  academicYear_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "AcademicYear",
    required: true,
  },
});
const GradeSubject = mongoose.model("GradeSubject", gradeSubjectSchema);
module.exports = GradeSubject;
