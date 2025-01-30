const mongoose = require("mongoose");
const managerSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    role: { type: String, default: "manager", enum: ["manager"] },
    gender: { type: String, enum: ["M", "F", "O"], required: true },
  },
  { timestamps: true }
);
const Manager = mongoose.model("Manager", managerSchema);
module.exports = Manager;
