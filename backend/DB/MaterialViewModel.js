const mongoose = require("mongoose");
const materialViewSchema = mongoose.Schema({
  material_id: { type: "ObjectId", ref: "Material" },
  student_id: { type: "ObjectId", ref: "Student" },
  is_viewed: { type: Boolean, default: false },
  last_view_at: { type: "String", default: Date.now },
});

const MaterialView = mongoose.model("MaterialView", materialViewSchema);

module.exports = MaterialView;
