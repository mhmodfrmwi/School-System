const mongoose = require("mongoose");
const parentStudentSchema = new mongoose.Schema(
  {
    parent_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Parent",
      required: true,
    },
    student_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
  },
  { timestamps: true }
);
const ParentStudent = mongoose.model("ParentStudent", parentStudentSchema);

module.exports = ParentStudent;
