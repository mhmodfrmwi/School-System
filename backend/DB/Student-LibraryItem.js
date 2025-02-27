const { string } = require("joi");
const mongoose = require("mongoose");

const studentLibraryItemSchema = mongoose.Schema({
  student_id: {
    type: "ObjectId",
    ref: "Student",
    required: true,
  },
  library_item_id: {
    type: "ObjectId",
    ref: "Book",
    required: true,
  },
  last_view_date: {
    type: "String",
    default: Date.now,
  },
});

const StudentLibraryItem = mongoose.model(
  "StudentLibraryItem",
  studentLibraryItemSchema
);

module.exports = StudentLibraryItem;
