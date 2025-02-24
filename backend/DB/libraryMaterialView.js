const mongoose = require("mongoose");
const libraryMaterialViewSchema = mongoose.Schema({
  library_material_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "LibraryItemsForGrade",
  },
  student_id: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
  is_viewed: { type: Boolean, default: false },
  last_view_at: { type: String, default: Date.now },
});

const LibraryMaterialView = mongoose.model(
  "LibraryMaterialView",
  libraryMaterialViewSchema
);

module.exports = LibraryMaterialView;
