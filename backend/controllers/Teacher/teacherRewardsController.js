const expressAsyncHandler = require("express-async-handler");
const validateObjectId = require("../../utils/validateObjectId");
const moment = require("moment");
const RewardClaim = require("../../DB/rewardClaimModel");
const UserPoint = require("../../DB/userPointModel");
const RewardCatalog = require("../../DB/rewardCatalogModel");
const Teacher = require("../../DB/teacher");

const getSemesterDates = () => {
  const currentYear = moment().year();
  const currentMonth = moment().month() + 1;
  let semesterStart, semesterEnd;

  if (currentMonth >= 9 && currentMonth <= 12) {
    semesterStart = moment(`${currentYear}-09-01`).startOf("day");
    semesterEnd = moment(`${currentYear}-12-31`).endOf("day");
  } else {
    semesterStart = moment(`${currentYear}-01-01`).startOf("day");
    semesterEnd = moment(`${currentYear}-06-30`).endOf("day");
  }
  return { semesterStart, semesterEnd };
};

const getTeachersWithPointsAndBadges = expressAsyncHandler(async (req, res) => {

  const { semesterStart, semesterEnd } = getSemesterDates();

  try {
    const teachers = await Teacher.find({})
    .populate("subjectId");

    const teachersWithPointsAndBadges = await Promise.all(
      teachers.map(async (teacher) => {
        const rewards = await RewardClaim.find({
          userId: teacher._id,
          userType: "Teacher",
          claimDate: { $gte: semesterStart.toDate(), $lte: semesterEnd.toDate() },
        }).populate("rewardId");

        let totalPoints = 0;
        rewards.forEach((rewardClaim) => {
          if (rewardClaim.rewardId && rewardClaim.value) {
            if (rewardClaim.rewardType === "add") {
              totalPoints += rewardClaim.value;
            } else if (rewardClaim.rewardType === "subtract") {
              totalPoints -= rewardClaim.value;
            }
          }
        });

        const userPoint = await UserPoint.findOne({
          userId: teacher._id,
          userType: "Teacher",
        });

        const badge = userPoint ? userPoint.badges : "Green";
        const subject = teacher.subjectId
          ? {
              _id: teacher.subjectId._id,
              subjectName: teacher.subjectId.subjectName,
              subjectCode: teacher.subjectId.subjectCode,
            }
          : null;

        return {
          _id: teacher._id,
          academicNumber: teacher.academicNumber,
          fullName: teacher.fullName,
          totalPoints,
          badge,
          subject,
        };
      })
    );

    teachersWithPointsAndBadges.sort((a, b) => b.totalPoints - a.totalPoints);
    res.status(200).json({
      success: true,
      status: 200,
      message: "Teachers' points and badges fetched successfully.",
      data: teachersWithPointsAndBadges,
    });
  } catch (error) {
    console.error("Error fetching teachers' points and badges:", error);
    res.status(500).json({
      success: false,
      status: 400,
      message: "Failed to fetch teachers' points and badges.",
      error: error.message,
    });
  }
});

const getTeacherWithPointsAndBadges = expressAsyncHandler(async (req, res) => {
  const teacherId = req.user.id;

  if (!validateObjectId(teacherId)) {
    return res.status(400).json({
      success: false,
      status: 400,
      message: "Invalid teacher ID.",
    });
  }

  const { semesterStart, semesterEnd } = getSemesterDates();

  try {
    const teacher = await Teacher.findById(teacherId).populate("subjectId");
    if (!teacher) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: "Teacher not found.",
      });
    }

    const rewards = await RewardClaim.find({
      userId: teacher._id,
      userType: "Teacher",
      claimDate: { $gte: semesterStart.toDate(), $lte: semesterEnd.toDate() },
    }).populate("rewardId");

    let totalPoints = 0;
    rewards.forEach((rewardClaim) => {
      if (rewardClaim.rewardId && rewardClaim.value) {
        if (rewardClaim.rewardType === "add") {
          totalPoints += rewardClaim.value;
        } else if (rewardClaim.rewardType === "subtract") {
          totalPoints -= rewardClaim.value;
        }
      }
    });

    const userPoint = await UserPoint.findOne({
      userId: teacher._id,
      userType: "Teacher",
    });

    const badge = userPoint ? userPoint.badges : "Green";

    const subject = teacher.subjectId
      ? {
          _id: teacher.subjectId._id,
          subjectName: teacher.subjectId.subjectName,
          subjectCode: teacher.subjectId.subjectCode,
        }
      : null;

    res.status(200).json({
      success: true,
      status: 200,
      message: "Teacher's points and badges fetched successfully.",
      data: {
        _id: teacher._id,
        academicNumber: teacher.academicNumber,
        fullName: teacher.fullName,
        totalPoints,
        badge,
        subject,
      },
    });
  } catch (error) {
    console.error("Error fetching teacher's points and badges:", error);
    res.status(500).json({
      success: false,
      status: 500,
      message: "Failed to fetch teacher's points and badges.",
      error: error.message,
    });
  }
});

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
          totalDailyPoints -= rewardClaim.value;
        }
        validRewards.push(rewardClaim);
      } else {
        console.warn(
          `Invalid rewardId found for RewardClaim with ID: ${rewardClaim._id}`
        );
      }
    });
    const userPoint = await UserPoint.findOne({
      userId: teacherId,
      userType: "Teacher",
    });
    
    let badge = "Green";
    if (userPoint) {
      badge = userPoint.badges;
    }

    res.status(200).json({
      success: true,
      status: 200,
      message: "Daily points fetched successfully",
      data: {
        totalDailyPoints,
        dailyRewards: validRewards,
        badge,
      },
    });
  } catch (error) {
    console.error("Error fetching daily points:", error);
    res.status(500).json({
      success: false,
      status: 400,
      message: "Failed to fetch daily points",
      error: error.message,
    });
  }
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
    status: 200,
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
  getTeachersWithPointsAndBadges,
  getTeacherWithPointsAndBadges
};