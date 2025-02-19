const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const teamSchema = new Schema(
  {
    teamName: {
      type: String,
      required: true,
      unique: true,
    },
    contestId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Contest",
      required: true,
    },
    teamMembers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        required: true,
      },
    ],
  },
  { timestamps: true }
);

teamSchema.index({ contestId: 1, teamMembers: 1 }, { unique: true });

const Team = mongoose.model("Team", teamSchema);

module.exports = Team;