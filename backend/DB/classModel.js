const mongoose = require("mongoose");
const classSchema = new mongoose.Schema(
  {
    className: { type: "String", required: true },
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
    student_count: { type: "Number", default: 0 },
  },
  { timestamps: true }
);
const Class = mongoose.model("Class", classSchema);
module.exports = Class;
