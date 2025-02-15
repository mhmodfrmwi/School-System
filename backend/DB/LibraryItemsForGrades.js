const mongoose = require("mongoose");
const libraryItemsForGrades = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  item_url: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  uploaded_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
    required: true,
  },
  type: {
    type: String,
    enum: ["Video", "PDF"],
    required: true,
  },
  grade_subject_semester_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "GradeSubjectSemester",
    required: true,
  },
});

const LibraryItemsForGrade = mongoose.model(
  "LibraryItemsForGrade",
  libraryItemsForGrades
);

module.exports = LibraryItemsForGrade;
