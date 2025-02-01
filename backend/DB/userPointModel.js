const mongoose = require('mongoose');

const userPointSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    rewardId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'RewardCatalog',
        required: true
    },
    totalPoints: {
        type: Number,
        required: true,
    },
    badges: {
        type: String,
        required: true ,
        enum: ["starter","Bronze", "Silver", "Gold"],
    }
}, { timestamps: true });

module.exports = mongoose.model('UserPoint', userPointSchema);