const mongoose = require("mongoose");

const academicYearSchema = new mongoose.Schema(
  {
    startYear: { type: Number },
    endYear: { type: Number },
  },
  { timestamps: true }
);
const AcademicYear = mongoose.model("AcademicYear", academicYearSchema);
module.exports = AcademicYear;
