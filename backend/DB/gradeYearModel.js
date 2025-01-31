const mongoose = require("mongoose");
const gradeYearSchema = new mongoose.Schema(
  {
    academicYear_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AcademicYear",
      required: true,
    },
    gradeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Grade",
      required: true,
    },
  },
  { timestamps: true }
);
const GradeYear = mongoose.model("GradeYear", gradeYearSchema);

module.exports = GradeYear;
