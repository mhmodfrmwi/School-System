const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const participationSchema = new Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    schoolHubId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SchoolHub",
      required: true,
    },
    participated: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

participationSchema.index({ studentId: 1, schoolHubId: 1 }, { unique: true });

const Participation = mongoose.model("Participation", participationSchema);

module.exports = Participation;