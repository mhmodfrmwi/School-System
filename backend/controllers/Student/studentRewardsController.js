const expressAsyncHandler = require("express-async-handler");
const validateObjectId = require("../../utils/validateObjectId");
const moment = require('moment');
const RewardClaim = require("../../DB/rewardClaimModel");
const UserPoint = require("../../DB/userPointModel");
const RewardCatalog = require("../../DB/rewardCatalogModel");
const Student = require("../../DB/student");

const getSemesterDates = () => {
  const currentMonth = moment().month() + 1;
  let semesterStart, semesterEnd;

  if (currentMonth >= 9 && currentMonth <= 12) {
    semesterStart = moment().month(8).date(1).startOf('day');
    semesterEnd = moment().month(11).date(31).endOf('day');
  } else {
    semesterStart = moment().month(0).date(1).startOf('day');
    semesterEnd = moment().month(5).date(30).endOf('day');
  }

  return { semesterStart, semesterEnd };
};

const getSemesterPoints = expressAsyncHandler(async (req, res) => {
  const studentId = req.user.id;

  if (!validateObjectId(studentId)) {
    return res.status(400).json({
      status: 400,
      message: "Invalid student ID.",
    });
  }

  const { semesterStart, semesterEnd } = getSemesterDates();

  try {
    const semesterRewards = await RewardClaim.find({
      userId: studentId,
      userType: "Student",
      claimDate: { $gte: semesterStart.toDate(), $lte: semesterEnd.toDate() },
    }).populate("rewardId");

    let totalSemesterPoints = 0;
    const validRewards = [];

    semesterRewards.forEach((rewardClaim) => {
      if (rewardClaim.rewardId && rewardClaim.value) {
        if (rewardClaim.rewardType === "add") {
          totalSemesterPoints += rewardClaim.value;
        } else if (rewardClaim.rewardType === "subtract") {
          totalSemesterPoints -= rewardClaim.rewardId.points;
        }
        validRewards.push(rewardClaim);
      } else {
        console.warn(
          `Invalid rewardId found for RewardClaim with ID: ${rewardClaim._id}`
        );
      }
    });

    const userPoint = await UserPoint.findOne({
      userId: studentId,
      userType: "Student",
    });

    let badge = null;
    if (userPoint) {
      badge = userPoint.badges;
    }

    res.status(200).json({
      success: true,
      message: "Semester points fetched successfully",
      data: {
        totalSemesterPoints,
        semesterRewards: validRewards,
        badge,
      },
    });
  } catch (error) {
    console.error("Error fetching semester points:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch semester points",
      error: error.message,
    });
  }
});
const getStudentWithFriendsPoints = expressAsyncHandler(async (req, res) => {
  const studentId = req.user.id;

  if (!validateObjectId(studentId)) {
    return res.status(400).json({
      success: false,
      message: "Invalid student ID.",
    });
  }

  const student = await Student.findById(studentId);
  if (!student) {
    return res.status(404).json({
      success: false,
      message: "Student not found.",
    });
  }

  const { semesterStart, semesterEnd } = getSemesterDates();

  const friends = await Student.find({
    gradeId: student.gradeId,
    classId: student.classId,
    academicYear_id: student.academicYear_id,
    _id: { $ne: student._id },
  });

  const friendsWithPoints = await Promise.all(
    friends.map(async (friend) => {
      const rewards = await RewardClaim.find({
        userId: friend._id,
        userType: "Student",
        claimDate: { $gte: semesterStart.toDate(), $lte: semesterEnd.toDate() },
      }).populate("rewardId");

      let totalPoints = 0;
      rewards.forEach((rewardClaim) => {
        if (rewardClaim.rewardId && rewardClaim.value) {
          if (rewardClaim.rewardType === "add") {
            totalPoints += rewardClaim.value;
          } else if (rewardClaim.rewardType === "subtract") {
            totalPoints -= rewardClaim.rewardId.points;
          }
        }
      });

      const userPoint = await UserPoint.findOne({
        userId: friend._id,
        userType: "Student",
      });

      const badge = userPoint ? userPoint.badges : "Green";
      return {
        _id: friend._id,
        fullName: friend.fullName,
        academic_number: friend.academic_number,
        totalPoints,
        badge,
      };
    })
  );

  const loggedInStudentRewards = await RewardClaim.find({
    userId: student._id,
    userType: "Student",
    claimDate: { $gte: semesterStart.toDate(), $lte: semesterEnd.toDate() },
  }).populate("rewardId");

  let loggedInStudentPoints = 0;
  loggedInStudentRewards.forEach((rewardClaim) => {
    if (rewardClaim.rewardId && rewardClaim.value) {
      if (rewardClaim.rewardType === "add") {
        loggedInStudentPoints += rewardClaim.value;
      } else if (rewardClaim.rewardType === "subtract") {
        loggedInStudentPoints -= rewardClaim.rewardId.points;
      }
    }
  });
  const loggedInUserPoint = await UserPoint.findOne({
      userId: student._id,
      userType: "Student",
  });
  
    const loggedInStudentBadge = loggedInUserPoint ? loggedInUserPoint.badges : "Green";
  res.status(200).json({
    success: true,
    message: "Student data and friends' points fetched successfully.",
    data: {
      student: {
        _id: student._id,
        fullName: student.fullName,
        academic_number: student.academic_number,
        totalPoints: loggedInStudentPoints,
        badge: loggedInStudentBadge,
      },
      friends: friendsWithPoints,
    },
  });
});

const getDailyPoints = expressAsyncHandler(async (req, res) => {
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

  try {
    const dailyRewards = await RewardClaim.find({
      userId: studentId,
      userType: "Student",
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

    const userPoint = await UserPoint.findOne({
      userId: studentId,
      userType: "Student",
    });

    let badge = "Green";
    if (userPoint) {
      badge = userPoint.badges;
    }
    res.status(200).json({
      success: true,
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
      message: "Failed to fetch daily points",
      error: error.message,
    });
  }
});

const getAllPoints = expressAsyncHandler(async (req, res) => {
  const studentId = req.user.id;

  if (!validateObjectId(studentId)) {
    return res.status(400).json({
      status: 400,
      message: "Invalid student ID.",
    });
  }

  const userPoint = await UserPoint.findOne({
    userId: studentId,
    userType: "Student",
  });

  if (!userPoint) {
    return res.status(404).json({
      success: false,
      message: "No points found for this student",
    });
  }

  res.status(200).json({
    success: true,
    message: "Student points fetched successfully",
    data: {
      totalPoints: userPoint.totalPoints,
      badges: userPoint.badges,
    },
  });
});

module.exports = {
  getDailyPoints,
  getAllPoints,
  getSemesterPoints,
  getStudentWithFriendsPoints,
};