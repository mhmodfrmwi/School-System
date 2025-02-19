const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contestTeamSchema = new Schema(
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
    leaderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
  },
  { timestamps: true }
);

contestTeamSchema.index({ contestId: 1, teamMembers: 1 }, { unique: true });

const ContestTeam = mongoose.model("ContestTeam", contestTeamSchema);

module.exports = ContestTeam;