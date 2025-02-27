const mongoose = require("mongoose");
const scheduleSchema = new mongoose.Schema(
  {
    class_id: {
      type: "ObjectId",
      ref: "Class",
      required: true,
    },
    subject_id: {
      type: "ObjectId",
      ref: "Subject",
      required: true,
    },
    teacher_id: {
      type: "ObjectId",
      ref: "Teacher",
      required: true,
    },
    grade_id: {
      type: "ObjectId",
      ref: "Grade",
      required: true,
    },
    day_of_week: { type: "String", required: true },
    start_time: { type: "String", required: true },
    end_time: { type: "String", required: true },
    semester_id: {
      type: "ObjectId",
      ref: "Semester",
      required: true,
    },
    academic_year_id: {
      type: "ObjectId",
      ref: "AcademicYear",
      required: true,
    },
  },
  { timestamps: true }
);
const Schedule = mongoose.model("Schedule", scheduleSchema);
module.exports = Schedule;
