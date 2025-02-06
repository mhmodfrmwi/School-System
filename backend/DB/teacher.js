const mongoose = require("mongoose");
const path = require("path");
const bcrypt = require("bcrypt");

const teacherSchema = new mongoose.Schema(
  {
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
    profileImage: {
      type: String,
      default: path.join(__dirname, "../images/student.png"),
      default:
        "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?t=st=1733078248~exp=1733081848~hmac=e2eec059dc2217f905388f452eaf9dee7d9679765c2b0ac7f273a5cfe7cd4bde&w=740",
    },
  },
  { timestamps: true }
);
teacherSchema.methods.comparePasswordInDb = async function (pswd, pswdDB) {
  return await bcrypt.compare(pswd, pswdDB);
};
const Teacher = mongoose.model("Teacher", teacherSchema);
module.exports = Teacher;
