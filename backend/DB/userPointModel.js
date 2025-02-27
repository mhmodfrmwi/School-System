const mongoose = require('mongoose');

const userPointSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: 'userType',
  },
  /*rewardId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'RewardCatalog',
    required: true
  },*/
  totalPoints: {
    type: Number,
    required: true,
  },
  badges: {
    type: String,
    required: true,
    enum: ["Green", "Diamond", "Gold"],
  },
  userType: {
    type: String,
    required: true,
    enum: ["Student", "Teacher"],
  }
}, { timestamps: true });

module.exports = mongoose.model('UserPoint', userPointSchema);