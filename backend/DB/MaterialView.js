const mongoose = require("mongoose");
const materialViewSchema = mongoose.Schema({
  material_id: { type: mongoose.Schema.Types.ObjectId, ref: "Material" },
  student_id: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
  isViewed: { type: Boolean, default: false },
  lastViewedAt: { type: Date, default: Date.now },
});

const MaterialView = mongoose.model("MaterialView", materialViewSchema);

module.exports = MaterialView;
