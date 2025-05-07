const SchoolHub = require("../../DB/schoolHubModel");
const expressAsyncHandler = require("express-async-handler");
const validateObjectId = require("../../utils/validateObjectId");
const addRewardClaimAndUpdatePoints = require("../../utils/updatingRewards");
const Participation = require("../../DB/schoolHubParticipationModel");

const getAllSchoolHubs = expressAsyncHandler(async (req, res) => {
    const {studentId} = req.params;

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

module.exports = {
    getAllSchoolHubs,
};