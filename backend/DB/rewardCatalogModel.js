const mongoose = require("mongoose");

const rewardCatalogSchema = new mongoose.Schema(
  {
    rewardName: {
      type: "String",
      required: true,
    },
    points: {
      type: Number,
      required: true,
      default: 0,
    },
    userType: {
      type: "String",
      required: true,
      enum: ["Student", "Teacher"],
    },
  },
  { timestamps: true }
);

const RewardCatalog = mongoose.model("RewardCatalog", rewardCatalogSchema);

module.exports = RewardCatalog;
