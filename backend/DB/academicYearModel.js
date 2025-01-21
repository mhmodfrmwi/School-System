const mongoose = require("mongoose");

const academicYearSchema = new mongoose.Schema({
  year_name: { type: String, required: true },
  start_date: { type: Date, required: true },
  end_date: { type: Date, required: true },
});

module.exports = mongoose.model("AcademicYear", academicYearSchema);
