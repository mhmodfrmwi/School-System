const expressAsyncHandler = require("express-async-handler");
const validateObjectId = require("../../utils/validateObjectId");
const RewardClaim = require("../../DB/rewardClaimModel");
const UserPoint = require("../../DB/userPointModel");
const RewardCatalog = require("../../DB/rewardCatalogModel");

const getDailyPoints = expressAsyncHandler(async (req, res) => {
  const teacherId = req.user.id;

  if (!validateObjectId(teacherId)) {
    return res.status(400).json({
      status: 400,
      message: "Invalid Teacher ID.",
    });
  }

  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);

  try {
    const dailyRewards = await RewardClaim.find({
      userId: teacherId,
      userType: "Teacher",
      claimDate: { $gte: startOfDay, $lte: endOfDay },
    }).populate("rewardId");

    let totalDailyPoints = 0;
    const validRewards = [];

    dailyRewards.forEach((rewardClaim) => {
      if (rewardClaim.rewardId && rewardClaim.value) {
        if (rewardClaim.rewardType === "add") {
          totalDailyPoints += rewardClaim.value;
        } else if (rewardClaim.rewardType === "subtract") {
          totalDailyPoints -= rewardClaim.rewardId.points;
        }
        validRewards.push(rewardClaim);
      } else {
        console.warn(
          `Invalid rewardId found for RewardClaim with ID: ${rewardClaim._id}`
        );
      }
    });

    res.status(200).json({
      success: true,
      message: "Daily points fetched successfully",
      data: {
        totalDailyPoints,
        dailyRewards: validRewards,
      },
    });
  } catch (error) {
    console.error("Error fetching daily points:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch daily points",
      error: error.message,
    });
  }
});

const getDailyPoints1 = expressAsyncHandler(async (req, res) => {
  const studentId = req.user.id;

  if (!validateObjectId(studentId)) {
    return res.status(400).json({
      status: 400,
      message: "Invalid student ID.",
    });
  }

  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);

  const dailyRewards = await RewardClaim.find({
    userId: studentId,
    userType: "Student",
    claimDate: { $gte: startOfDay, $lte: endOfDay },
  }).populate("rewardId");

  let totalDailyPoints = 0;
  dailyRewards.forEach((rewardClaim) => {
    totalDailyPoints += rewardClaim.rewardId.points;
  });

  res.status(200).json({
    success: true,
    message: "Daily points fetched successfully",
    data: {
      totalDailyPoints,
      dailyRewards,
    },
  });
});

const getAllPoints = expressAsyncHandler(async (req, res) => {
  const teacherId = req.user.id;

  if (!validateObjectId(teacherId)) {
    return res.status(400).json({
      status: 400,
      message: "Invalid Teacher ID.",
    });
  }

  const userPoint = await UserPoint.findOne({
    userId: teacherId,
    userType: "Teacher",
  });

  if (!userPoint) {
    return res.status(404).json({
      success: false,
      message: "No points found for this Teacher",
    });
  }

  res.status(200).json({
    success: true,
    message: "Teacher points fetched successfully",
    data: {
      totalPoints: userPoint.totalPoints,
      badges: userPoint.badges,
    },
  });
});

module.exports = {
  getDailyPoints,
  getAllPoints,
};
/*const expressAsyncHandler = require("express-async-handler");
const validateObjectId = require("../../utils/validateObjectId");
const RewardClaim = require("../../DB/rewardClaimModel");
const UserPoint = require("../../DB/userPointModel");
const RewardCatalog = require("../../DB/rewardCatalogModel");

const getDailyPoints = expressAsyncHandler(async (req, res) => {
  const teacherId = req.user.id;

  if (!validateObjectId(teacherId)) {
    return res.status(400).json({
      status: 400,
      message: "Invalid teacher ID.",
    });
  }

  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);

  const dailyRewards = await RewardClaim.find({
    userId: teacherId,
    userType: "Teacher",
    claimDate: { $gte: startOfDay, $lte: endOfDay },
  }).populate("rewardId");

  let totalDailyPoints = 0;
  dailyRewards.forEach((rewardClaim) => {
    totalDailyPoints += rewardClaim.rewardId.points;
  });

  res.status(200).json({
    success: true,
    message: "Daily points fetched successfully",
    data: {
      totalDailyPoints,
      dailyRewards,
    },
  });
});

const getAllPoints = expressAsyncHandler(async (req, res) => {
  const teacherId = req.user.id;

  if (!validateObjectId(teacherId)) {
    return res.status(400).json({
      status: 400,
      message: "Invalid teacher ID.",
    });
  }

  const userPoint = await UserPoint.findOne({
    userId: teacherId,
    userType: "Teacher",
  });

  if (!userPoint) {
    return res.status(404).json({
      success: false,
      message: "No points found for this teacher",
    });
  }

  res.status(200).json({
    success: true,
    message: "teacher points fetched successfully",
    data: {
      totalPoints: userPoint.totalPoints,
      badges: userPoint.badges,
    },
  });
});

module.exports = {
  getDailyPoints,
  getAllPoints,
};*/