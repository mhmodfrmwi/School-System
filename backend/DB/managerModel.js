const mongoose = require("mongoose");
const path = require("path");
const bcrypt = require("bcrypt");

const managerSchema = new mongoose.Schema(
  {
    fullName: { type: "String", required: true },
    email: { type: "String", required: true, unique: true },
    password: { type: "String", required: true },
    phone: { type: "String", required: true },
    role: { type: "String", default: "manager", enum: ["manager"] },
    gender: { type: "String", enum: ["M", "F", "O"], required: true },
    profileImage: {
      type: "String",
      default: path.join(__dirname, "../images/student.png"),
      default:
        "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?t=st=1733078248~exp=1733081848~hmac=e2eec059dc2217f905388f452eaf9dee7d9679765c2b0ac7f273a5cfe7cd4bde&w=740",
    },
    isVerified: { type: "Boolean", default: false },
  },
  { timestamps: true }
);
managerSchema.methods.comparePasswordInDb = async function (pswd, pswdDB) {
  return await bcrypt.compare(pswd, pswdDB);
};
const Manager = mongoose.model("Manager", managerSchema);
module.exports = Manager;
