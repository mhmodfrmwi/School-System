const mongoose = require("mongoose");

const userPointSchema = new mongoose.Schema(
  {
    userId: {
      type: "ObjectId",
      ref: "User",
      required: true,
    },
    totalPoints: {
      type: Number,
      required: true,
    },
    userType: {
      type: "String",
      required: true,
      enum: ["student", "teacher", "admin"],
    },
    badges: {
      type: "String",
      required: true,
      enum: ["starter", "Bronze", "Silver", "Gold"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("UserPoint", userPointSchema);
