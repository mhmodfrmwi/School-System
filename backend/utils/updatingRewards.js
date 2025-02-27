const RewardCatalog = require("../DB/rewardCatalogModel");
const RewardClaim = require("../DB/rewardClaimModel");
const UserPoint = require("../DB/userPointModel");

const addRewardClaimAndUpdatePoints = async (
  userId,
  userType,
  rewardName,
  operation = "add",
  points = null
) => {

  let value = 0;
    //console.log((await RewardCatalog.findOne({ rewardName }))._id)
  try {
    if (!points) {
      const reward = await RewardCatalog.findOne({ rewardName, userType });
      if (!reward) {
        throw new Error(
          `Reward "${rewardName}" not found for user type "${userType}"`
        );
      }
      points = reward.points;
    }

    let userPoint = await UserPoint.findOne({ userId, userType });

    if (!userPoint) {
      if (operation === "subtract") {
        points=0;
        value=0;
      }else{
        value= points;
      }

      userPoint = new UserPoint({
        userId,
        userType,
        totalPoints: points,
        badges: getBadge(points),
      });
    } else {
      if (operation === "add") {
        //console.log(points)
        value = points;
        userPoint.totalPoints += points;
      } else if (operation === "subtract") {
        if (userPoint.totalPoints < points) {
            value = userPoint.totalPoints
            points= userPoint.totalPoints;
        }else{
            value = points;
        }
        userPoint.totalPoints -= points;
      } else {
        throw new Error(
          `Invalid operation: "${operation}". Use "add" or "subtract".`
        );
      }

      userPoint.badges = getBadge(userPoint.totalPoints);
    }

    await userPoint.save();

    const rewardClaim = new RewardClaim({
      userId,
      rewardId: (await RewardCatalog.findOne({ rewardName ,userType}))._id,
      userType,
      rewardType: operation,
      value,
    });
    await rewardClaim.save();

    console.log("Reward claim and user points updated successfully!");
    return { rewardClaim, userPoint };
  } catch (error) {
    console.error("Error in addRewardClaimAndUpdatePoints:", error);
    throw error;
  }
};

function getBadge(totalPoints) {
  if (totalPoints >= 0 && totalPoints <= 250) {
    return "Green";
  } else if (totalPoints >= 251 && totalPoints <= 400) {
    return "Gold";
  } else if (totalPoints > 400) {
    return "Diamond";
  }
  throw new Error("Invalid totalPoints value");
}

module.exports = addRewardClaimAndUpdatePoints;
/*const RewardCatalog = require("../DB/rewardCatalogModel");
const RewardClaim = require("../DB/rewardClaimModel");
const UserPoint = require("../DB/userPointModel");

const addRewardClaimAndUpdatePoints = async (userId, userType, rewardName, points = null) => {
  try {
    // Step 1: Fetch reward points from RewardCatalog if not provided
    if (!points) {
      const reward = await RewardCatalog.findOne({ rewardName, userType });
      if (!reward) {
        throw new Error(`Reward "${rewardName}" not found for user type "${userType}"`);
      }
      points = reward.points;
    }

    // Step 2: Create a new RewardClaim
    const rewardClaim = new RewardClaim({
      userId,
      rewardId: (await RewardCatalog.findOne({ rewardName }))._id, // Find rewardId by rewardName
      userType,
    });
    await rewardClaim.save();

    // Step 3: Update or create UserPoint
    let userPoint = await UserPoint.findOne({ userId, userType });

    if (!userPoint) {
      // Create a new UserPoint if it doesn't exist
      userPoint = new UserPoint({
        userId,
        userType,
        totalPoints: points,
        badges: getBadge(points), // Determine badge based on points
      });
    } else {
      // Update existing UserPoint
      userPoint.totalPoints += points;
      userPoint.badges = getBadge(userPoint.totalPoints); // Update badge based on new totalPoints
    }

    await userPoint.save();

    console.log("Reward claim and user points updated successfully!");
    return { rewardClaim, userPoint };
  } catch (error) {
    console.error("Error in addRewardClaimAndUpdatePoints:", error);
    throw error;
  }
}

// Helper function to determine badge based on totalPoints
function getBadge(totalPoints) {
  if (totalPoints >= 0 && totalPoints <= 250) {
    return "Green";
  } else if (totalPoints >= 251 && totalPoints <= 400) {
    return "Gold";
  } else if (totalPoints > 400) {
    return "Diamond";
  }
  throw new Error("Invalid totalPoints value");
}

module.exports = addRewardClaimAndUpdatePoints;*/
