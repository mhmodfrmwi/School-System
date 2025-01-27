const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const path = require("path");
const studentSchema = new mongoose.Schema({
  academic_number: { type: String, required: true, unique: true },
  fullName: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  gender: { type: String, enum: ["M", "F", "O"], required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  admission_date: { type: Date, required: true },
  password: { type: String, required: true },
  gradeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Grade",
    required: true,
  },
  classId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Class",
    required: true,
  },
  academicYear_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "AcademicYear",
    required: true,
  },
  profileImage: {
    type: String,
    default: path.join(__dirname, "../images/student.png"),
    default:
      "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?t=st=1733078248~exp=1733081848~hmac=e2eec059dc2217f905388f452eaf9dee7d9679765c2b0ac7f273a5cfe7cd4bde&w=740",
  },
});
studentSchema.methods.comparePasswordInDb = async function (pswd, pswdDB) {
  return await bcrypt.compare(pswd, pswdDB);
};
module.exports = mongoose.model("Student", studentSchema);
