const mongoose = require("mongoose");
const parentSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  gender: { type: String, enum: ["M", "F", "O"], required: true },
});
const Parent = mongoose.model("Parent", parentSchema);
module.exports = Parent;
