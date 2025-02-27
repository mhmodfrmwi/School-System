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
    },
    userType: {
      type: "String",
      required: true,
      enum: ["student", "teacher", "admin"],
    },
  },
  { timestamps: true }
);

const RewardCatalog = mongoose.model("RewardCatalog", rewardCatalogSchema);

module.exports = RewardCatalog;
