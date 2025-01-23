const mongoose = require("mongoose");
const teacherSchema = new mongoose.Schema({
  academicNumber: { type: String, required: true, unique: true },
  fullName: { type: String, required: true },
  dateOfBirth: { type: String, required: true },
  gender: { type: String, enum: ["M", "F", "O"], required: true },
  address: { type: String, required: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  hireDate: { type: Date, required: true },
  subjectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subject",
    required: true,
  },
});
const Teacher = mongoose.model("Teacher", teacherSchema);
module.exports = Teacher;
