const SchoolHub = require("../../DB/schoolHubModel");
const expressAsyncHandler = require("express-async-handler");
const validateObjectId = require("../../utils/validateObjectId");
const addRewardClaimAndUpdatePoints = require("../../utils/updatingRewards");
const Participation = require("../../DB/schoolHubParticipationModel");

const getAllSchoolHubs = expressAsyncHandler(async (req, res) => {
    const studentId = req.user.id;

    if (!validateObjectId(studentId)) {
        return res.status(400).json({
        status: 400,
        message: "Invalid student ID or gradeSubjectSemester ID.",
        });
    }
    const schoolHubs = await SchoolHub.find();

    res.status(200).json({
        status: 200,
        message: "SchoolHubs retrieved successfully",
        schoolHubs,
    });
});
const registerInContest = expressAsyncHandler(async (req, res) => {
    const { schoolHubId } = req.params;
    const studentId = req.user.id;
  
    if (!validateObjectId(studentId)) {
      return res.status(400).json({
        status: 400,
        message: "Invalid student ID.",
      });
    }
    if ( !validateObjectId(schoolHubId)) {
        return res.status(400).json({
          status: 400,
          message: "Invalid SchoolHub ID.",
        });
    }
  
    try {
      const schoolHub = await SchoolHub.findById(schoolHubId);
      if (!schoolHub) {
        return res.status(404).json({
          status: 404,
          message: "Contest not found.",
        });
      }
  
      let participation = await Participation.findOne({ studentId, schoolHubId });
  
      if (!participation) {
        participation = new Participation({
          studentId,
          schoolHubId,
          participated: true,
        });
  
        await participation.save();
  
        return res.status(201).json({
          status: 201,
          message: "Student successfully registered and marked as participated!",
          participation,
        });
      }

      if (participation.participated === true) {
        return res.status(400).json({
          status: 400,
          message: "Student is already registered for this contest.",
        });
      }
  
      participation.participated = true;
      await participation.save();
////////////////////////////
      /*try {
      await addRewardClaimAndUpdatePoints(studentId, "Student", "School Hub");
      } catch (error) {
      console.error("Error in addRewardClaimAndUpdatePoints:", error);
      }*/
      //await addRewardClaimAndUpdatePoints(studentId, "Student", "School Hub");
////////////////////////////////
      res.status(200).json({
        status: 200,
        message: "Participation marked successfully!",
        participation,
      });
    } catch (error) {
      console.error("Error in registerAndMarkParticipation:", error);
      res.status(500).json({
        status: 500,
        message: "Internal server error.",
      });
    }
  });
const checkParticipation = expressAsyncHandler(async (req, res) => {
const { schoolHubId } = req.params;
const studentId = req.user.id;

if (!validateObjectId(studentId) || !validateObjectId(schoolHubId)) {
    return res.status(400).json({
    status: 400,
    message: "Invalid student ID or SchoolHub ID.",
    });
}

try {
    const participation = await Participation.findOne({ studentId, schoolHubId });

    if (!participation || participation.participated === false) {
    return res.status(200).json({
        status: 200,
        message: "You have not registered yet.",
    });
    }

    res.status(200).json({
    status: 200,
    message: "You have been registered.",
    participated: participation.participated,
    });
} catch (error) {
    console.error("Error checking participation:", error);
    res.status(500).json({
    status: 500,
    message: "Internal server error.",
    });
}
});
const deleteRegistration = expressAsyncHandler(async (req, res) => {
    const { schoolHubId } = req.params;
    const studentId = req.user.id;
  
    if (!validateObjectId(studentId) || !validateObjectId(schoolHubId)) {
      return res.status(400).json({
        status: 400,
        message: "Invalid student ID or SchoolHub ID.",
      });
    }
  
    try {
      const participation = await Participation.findOne({ studentId, schoolHubId });
  
      if (!participation) {
        return res.status(404).json({
          status: 404,
          message: "No registration found for this contest.",
        });
      }
  
      await Participation.deleteOne({ _id: participation._id });
      //await addRewardClaimAndUpdatePoints(studentId, "Student", "School Hub","subtract");
      res.status(200).json({
        status: 200,
        message: "Registration deleted successfully.",
      });
    } catch (error) {
      console.error("Error deleting registration:", error);
      res.status(500).json({
        status: 500,
        message: "Internal server error.",
      });
    }
});
module.exports = {
    getAllSchoolHubs,
    registerInContest,
    checkParticipation,
    deleteRegistration
};