const mongoose = require("mongoose");
const bookMarkForMaterialSchema = mongoose.Schema(
  {
    material_id: {
      type: "ObjectId",
      ref: "Material",
      required: true,
    },
    student_id: {
      type: "ObjectId",
      ref: "Student",
      required: true,
    },
  },
  { timestamps: true }
);

const BookMarkForMaterial = mongoose.model(
  "BookMarkForMaterial",
  bookMarkForMaterialSchema
);

module.exports = BookMarkForMaterial;
