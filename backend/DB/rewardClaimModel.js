const mongoose = require("mongoose");

const rewardClaimSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: "userType",
  },
  rewardId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "RewardCatalog",
    required: true,
  },
  userType: {
    type: String,
    required: true,
    enum: ["Student", "Teacher"],
  },
  rewardType:{
    type: String,
    required: true,
    enum: ["add", "subtract"],
  },
  value:{
    type: Number,
    required: true,
  },
  claimDate: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

const RewardClaim = mongoose.model("RewardClaim", rewardClaimSchema);

module.exports = RewardClaim;