const expressAsyncHandler = require("express-async-handler");
const validateObjectId = require("../../utils/validateObjectId");
const schoolHubValidationSchema = require("../../validations/schoolHubValidation");
const SchoolHub = require("../../DB/schoolHubModel");
const Student = require("../../DB/StudentModel");
const Participation = require("../../DB/schoolHubParticipationModel");

const createSchoolHub = expressAsyncHandler(async (req, res) => {
  const managerId = req.user.id;
  console.log(managerId.toString());
  if (!validateObjectId(managerId)) {
    return res.status(400).json({
      status: 400,
      message: "Invalid manager ID.",
    });
  }
  const { error } = schoolHubValidationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      status: 400,
      message: error.details[0].message,
    });
  }

  const {
    title,
    registrationStart,
    registrationEnd,
    contestDate,
    location,
    details,
    prizes,
  } = req.body;

  const existingSchoolHub = await SchoolHub.findOne({
    title,
    contestDate,
    location,
  });
  if (existingSchoolHub) {
    return res.status(400).json({
      status: 400,
      message:
        "A SchoolHub event with the same title and date and location already exists.",
    });
  }

  const newSchoolHub = new SchoolHub({
    title,
    registrationStart,
    registrationEnd,
    contestDate,
    location,
    details,
    prizes,
  });

  await newSchoolHub.save();

  res.status(201).json({
    status: 201,
    message: "SchoolHub created successfully",
    newSchoolHub,
  });
});

const getAllSchoolHubs = expressAsyncHandler(async (req, res) => {
  try {
    const schoolHubs = await SchoolHub.find();

    res.status(200).json({
      status: 200,
      message: "SchoolHubs retrieved successfully",
      schoolHubs,
    });
  } catch (error) {
    console.log(`Failed ${error.message}`);
    res.json({ message: `Failed ${error.message}` });
  }
});

const updateSchoolHub = expressAsyncHandler(async (req, res) => {
  const { schoolHubId } = req.params;

  if (!validateObjectId(schoolHubId)) {
    return res.status(400).json({
      status: 400,
      message: "Invalid SchoolHub ID",
    });
  }

  const { error } = schoolHubValidationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      status: 400,
      message: error.details[0].message,
    });
  }

  const schoolHub = await SchoolHub.findById(schoolHubId);
  if (!schoolHub) {
    return res.status(404).json({
      status: 404,
      message: "SchoolHub not found",
    });
  }

  Object.assign(schoolHub, req.body);
  await schoolHub.save();

  res.status(200).json({
    status: 200,
    message: "SchoolHub updated successfully",
    schoolHub,
  });
});

const deleteSchoolHub = expressAsyncHandler(async (req, res) => {
  const { schoolHubId } = req.params;

  if (!validateObjectId(schoolHubId)) {
    return res.status(400).json({
      status: 400,
      message: "Invalid SchoolHub ID",
    });
  }

  const schoolHub = await SchoolHub.findById(schoolHubId);
  if (!schoolHub) {
    return res.status(404).json({
      status: 404,
      message: "SchoolHub not found",
    });
  }

  await schoolHub.deleteOne();

  res.status(200).json({
    status: 200,
    message: "SchoolHub deleted successfully",
  });
});

const getContestStudents = expressAsyncHandler(async (req, res) => {
  const { schoolHubId } = req.params;

  if (!validateObjectId(schoolHubId)) {
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

    const participations = await Participation.find({
      schoolHubId,
      participated: true,
    }).populate({
      path: "studentId",
      select: "academic_number fullName email phone gradeId classId",
      populate: [
        {
          path: "gradeId",
          select: "gradeName",
        },
        {
          path: "classId",
          select: "className",
        },
      ],
    });

    res.status(200).json({
      status: 200,
      message: "Participating students retrieved successfully.",
      participations,
      count: participations.length,
    });
  } catch (error) {
    console.error("Error retrieving participating students:", error);
    res.status(500).json({
      status: 500,
      message: "Internal server error.",
    });
  }
});

module.exports = {
  createSchoolHub,
  getAllSchoolHubs,
  updateSchoolHub,
  deleteSchoolHub,
  getContestStudents,
};
