const expressAsyncHandler = require("express-async-handler");
const RewardCatalog = require("../../DB/rewardCatalogModel");
const RewardClaim = require("../../DB/rewardClaimModel");
const UserPoint = require("../../DB/userPointModel");

const rewards = [
  { rewardName: "View Material", points: 5, userType: "Student" },//done
  { rewardName: "Attend VR", points: 5, userType: "Student" },//done 
  {
    rewardName: "Interact on Discussion Room",
    points: 5,
    userType: "Student",
  },
  { rewardName: "View Question", points: 5, userType: "Student" },//done
  { rewardName: "View Library Item", points: 5, userType: "Student" },//done 
  { rewardName: "Contest", points: 5, userType: "Student" },//done
  { rewardName: "School Hub", points: 5, userType: "Student" },//done
  
  //teacher will add there value 
  { rewardName: "Exam", points: 0, userType: "Student" },
  { rewardName: "Assignment", points: 0, userType: "Student" },

  { rewardName: "Adding Contest", points: 5, userType: "Teacher" },//done
  { rewardName: "Adding Library Item", points: 5, userType: "Teacher" },//done
  { rewardName: "Adding Material Item", points: 5, userType: "Teacher" },//done
  { rewardName: "Adding Discussion Room", points: 5, userType: "Teacher" },
  { rewardName: "Adding VR", points: 5, userType: "Teacher" },//done
  { rewardName: "Adding Assignment", points: 5, userType: "Teacher" },
  { rewardName: "Adding Exam", points: 5, userType: "Teacher" },
  { rewardName: "Adding Question", points: 10, userType: "Teacher" },//done
];

const seedRewards = expressAsyncHandler(async (req, res) => {
    try {
        await RewardCatalog.deleteMany();
        await RewardClaim.deleteMany();
        await UserPoint.deleteMany();
        await RewardCatalog.insertMany(rewards);
        console.log("Rewards seeded successfully!");
        res.status(200).json({
            status: 200,
            message: "Rewards seeded successfully!",
          });
      } catch (error) {
        console.error("Error seeding rewards:", error);
      }
});
module.exports = {
    seedRewards,
};