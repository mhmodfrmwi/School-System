const mongoose = require("mongoose");
const verificationTokenSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  model: {
    type: String,
    required: true,
    enum: ["Student", "Admin", "Parent", "Teacher", "Manager"],
  },
  token: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 3600 },
});
const VerificationToken = mongoose.model(
  "VerificationToken",
  verificationTokenSchema
);
module.exports = VerificationToken;
