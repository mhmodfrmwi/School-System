const mongoose = require("mongoose");
const semesterSchema = new mongoose.Schema(
  {
    semesterName: { type: "String", required: true },
    academicYear_id: {
      type: "ObjectId",
      ref: "AcademicYear",
      required: true,
    },
  },
  { timestamps: true }
);
semesterSchema.index({
  semesterName: 1,
  academicYear_id: 1,
});
const Semester = mongoose.model("Semester", semesterSchema);
module.exports = Semester;
