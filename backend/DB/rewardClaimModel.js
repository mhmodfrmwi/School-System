const mongoose = require("mongoose");

const rewardClaimSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    rewardId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RewardCatalog",
      required: true,
    },
    userType: {
      type: String,
      required: true,
      enum: ["student", "teacher", "admin"],
    },
    claimDate: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const RewardClaim = mongoose.model("RewardClaim", rewardClaimSchema);

module.exports = RewardClaim;
