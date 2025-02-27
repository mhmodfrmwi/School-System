const mongoose = require("mongoose");
const gradeYearSchema = new mongoose.Schema(
  {
    academicYear_id: {
      type: "ObjectId",
      ref: "AcademicYear",
      required: true,
    },
    gradeId: {
      type: "ObjectId",
      ref: "Grade",
      required: true,
    },
  },
  { timestamps: true }
);
const GradeYear = mongoose.model("GradeYear", gradeYearSchema);

module.exports = GradeYear;
