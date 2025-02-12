const mongoose = require("mongoose");
const materialViewSchema = mongoose.Schema({
  material_id: { type: mongoose.Schema.Types.ObjectId, ref: "Material" },
  student_id: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
  is_viewed: { type: Boolean, default: false },
  last_view_at: { type: Date, default: Date.now },
  uploaded_at: { type: Date, default: Date.now },
});

const MaterialView = mongoose.model("MaterialView", materialViewSchema);

module.exports = MaterialView;
