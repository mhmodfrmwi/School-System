const mongoose = require("mongoose");
const gradeSubjectSchema = new mongoose.Schema(
  {
    subjectId: {
      type: "ObjectId",
      ref: "Subject",
      required: true,
    },
    gradeId: {
      type: "ObjectId",
      ref: "Grade",
      required: true,
    },
    academicYear_id: {
      type: "ObjectId",
      ref: "AcademicYear",
      required: true,
    },
  },
  { timestamps: true }
);
const GradeSubject = mongoose.model("GradeSubject", gradeSubjectSchema);
module.exports = GradeSubject;
