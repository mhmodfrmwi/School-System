const mongoose = require("mongoose");
const gradeSchema = new mongoose.Schema(
  {
    gradeName: { type: "String", required: true },
  },
  { timestamps: true }
);
const Grade = mongoose.model("Grade", gradeSchema);
module.exports = Grade;
