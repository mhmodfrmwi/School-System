const SchoolHub = require("../../DB/schoolHubModel");
const expressAsyncHandler = require("express-async-handler");

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

module.exports = {
    getAllSchoolHubs,
};