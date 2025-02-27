const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contestSchema = new Schema(
  {
    title: {
      type: "String",
      required: true,
    },
    teacherId: {
      type: "ObjectId",
      ref: "Teacher",
      required: true,
    },
    startDate: {
      type: "Date",
      required: true,
    },
    endDate: {
      type: "Date",
      required: true,
    },
    numberOfTeamMembers: {
      type: "Number",
      required: true,
    },
    requirements: {
      type: "String",
    },
    subjectId: {
      type: "ObjectId",
      ref: "Subject",
      required: true,
    },
    academicYearId: {
      type: "ObjectId",
      ref: "AcademicYear",
      required: true,
    },
    gradeId: {
      type: "ObjectId",
      ref: "Grade",
      required: true,
    },
    semesterId: {
      type: "ObjectId",
      ref: "Semester",
      required: true,
    },
    classId: {
      type: "ObjectId",
      ref: "Class",
      required: true,
    },
  },
  { timestamps: true }
);

const Contest = mongoose.model("Contest", contestSchema);

module.exports = Contest;
