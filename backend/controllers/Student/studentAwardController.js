const expressAsyncHandler = require("express-async-handler");
const UserPoint = require("../../DB/userPointModel");
const RewardClaim = require("../../DB/rewardClaimModel");
const RewardCatalog = require("../../DB/rewardCatalogModel");
const validateObjectId = require("../../utils/validateObjectId");

const updateStudentAwards = expressAsyncHandler(async (req, res) => {
  const { userId, rewardId } = req.body;

  if (!userId || !rewardId) {
    return res.status(400).json({
      status: 400,
      message: "Invalid input. userId and rewardId are required.",
    });
  }

  if (!validateObjectId(userId) || !validateObjectId(rewardId)) {
    return res.status(400).json({
      status: 400,
      message: "Invalid userId or rewardId. Please provide valid MongoDB ObjectIDs.",
    });
  }

  try {
    const reward = await RewardCatalog.findById(rewardId);

    if (!reward) {
      return res.status(404).json({
        status: 404,
        message: "Reward not found in the catalog.",
      });
    }

    const pointsToAdd = reward.points;

    let userPoints = await UserPoint.findOne({ userId });

    if (!userPoints) {
      userPoints = new UserPoint({
        userId,
        totalPoints: 0,
        badges: "starter",
      });
    }

    userPoints.totalPoints += pointsToAdd;

    if (userPoints.totalPoints >= 100 && userPoints.badges !== "Bronze") {
      userPoints.badges = "Bronze";
    }
    if (userPoints.totalPoints >= 500 && userPoints.badges !== "Silver") {
      userPoints.badges = "Silver";
    }
    if (userPoints.totalPoints >= 1000 && userPoints.badges !== "Gold") {
      userPoints.badges = "Gold";
    }

    await userPoints.save();

    const rewardClaim = new RewardClaim({
      userId,
      rewardId,
      userType: "student",
      claimDate: new Date(),
    });

    await rewardClaim.save();

    res.status(200).json({
      status: 200,
      message: "Awards updated successfully",
      userPoints,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Failed to update awards",
      error: error.message,
    });
  }
});

module.exports = {
  updateStudentAwards,
};
