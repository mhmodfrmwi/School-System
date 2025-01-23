const expressAsyncHandler = require("express-async-handler");
const validateObjectId = require("../utils/validateObjectId");
const academicYearValidationSchema = require("../validations/academicYearValidation");
const AcademicYear = require("../DB/academicYearModel");

const createAcademicYear = expressAsyncHandler(async (req, res) => {
  const { error } = academicYearValidationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      status: 400,
      message: error.details[0].message,
    });
  }

  const { startYear, endYear } = req.body;

  const existingAcademicYear = await AcademicYear.findOne({
    $or: [{ startYear }, { endYear }],
  });

  if (existingAcademicYear) {
    return res.status(400).json({
      status: 400,
      message: "Academic year with the same start or end year already exists.",
    });
  }

  const academicYear = new AcademicYear({
    startYear,
    endYear,
  });

  await academicYear.save();

  res.status(201).json({
    status: 201,
    message: "Academic year created successfully",
    academicYear,
  });
});

const updateAcademicYear = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!validateObjectId(id)) {
    return res.status(400).json({
      status: 400,
      message: "Invalid Academic Year ID",
    });
  }

  const { error } = academicYearValidationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      status: 400,
      message: error.details[0].message,
    });
  }

  const { startYear, endYear } = req.body;

  const existingAcademicYear = await AcademicYear.findOne({
    $and: [{ _id: { $ne: id } }, { $or: [{ startYear }, { endYear }] }],
  });

  if (existingAcademicYear) {
    return res.status(400).json({
      status: 400,
      message: "Academic year with the same start or end year already exists.",
    });
  }

  const academicYear = await AcademicYear.findByIdAndUpdate(
    id,
    {
      startYear,
      endYear,
    },
    { new: true }
  );

  if (!academicYear) {
    return res.status(404).json({
      status: 404,
      message: "Academic year not found",
    });
  }

  res.status(200).json({
    status: 200,
    message: "Academic year updated successfully",
    academicYear,
  });
});

const deleteAcademicYear = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!validateObjectId(id)) {
    return res.status(400).json({
      status: 400,
      message: "Error getting this page",
    });
  }
  const academicYear = await AcademicYear.findByIdAndDelete(id);
  if (!academicYear) {
    return res.status(404).json({
      status: 404,
      message: "Academic year not found",
    });
  }
  res.status(200).json({
    status: 200,
    message: "Academic year deleted successfully",
  });
});

const getAcademicYear = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!validateObjectId(id)) {
    return res.status(400).json({
      status: 400,
      message: "Error getting this page",
    });
  }
  const academicYear = await AcademicYear.findById(id);
  if (!academicYear) {
    return res.status(404).json({
      status: 404,
      message: "Academic year not found",
    });
  }
  res.status(200).json({
    status: 200,
    message: "Academic year retrieved successfully",
    academicYear,
  });
});

const getAllAcademicYear = expressAsyncHandler(async (req, res) => {
  const academicYears = await AcademicYear.find();
  res.status(200).json({
    status: 200,
    message: "Academic years retrieved successfully",
    academicYears,
  });
});

module.exports = {
  createAcademicYear,
  updateAcademicYear,
  deleteAcademicYear,
  getAcademicYear,
  getAllAcademicYear,
};
