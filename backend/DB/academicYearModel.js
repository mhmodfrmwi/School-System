const mongoose = require("mongoose");

const academicYearSchema = new mongoose.Schema(
  {
    startYear: { type: Number, required: true },
    endYear: { type: Number, required: true },
  },
  { timestamps: true }
);
const AcademicYear = mongoose.model("AcademicYear", academicYearSchema);
module.exports = AcademicYear;
