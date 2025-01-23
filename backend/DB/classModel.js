const mongoose = require("mongoose");
const classSchema = new mongoose.Schema({
  class_name: { type: String, required: true },
  grade_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Grade",
    required: true,
  },
  academic_year_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "AcademicYear",
    required: true,
  },
});
const Class = mongoose.model("Class", classSchema);
module.exports = Class;
