const mongoose = require("mongoose");
const classTeacherSchema = new mongoose.Schema(
  {
    classId: {
      type: "ObjectId",
      ref: "Class",
      required: true,
    },
    subjectId: {
      type: "ObjectId",
      ref: "Subject",
      required: true,
    },
    teacherId: {
      type: "ObjectId",
      ref: "Teacher",
      required: true,
    },
    academicYear_id: {
      type: "ObjectId",
      ref: "AcademicYear",
      required: true,
    },
    semester_id: {
      type: "ObjectId",
      ref: "Semester",
      required: true,
    },
  },
  { timestamps: true }
);
const ClassTeacher = mongoose.model("ClassTeacher", classTeacherSchema);
module.exports = ClassTeacher;
