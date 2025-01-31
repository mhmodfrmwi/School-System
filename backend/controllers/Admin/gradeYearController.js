const expressAsyncHandler = require("express-async-handler");
const validateObjectId = require("../../utils/validateObjectId");
const AcademicYear = require("../../DB/academicYearModel");
const GradeYear = require("../../DB/gradeYearModel");
const Grade = require("../../DB/gradeModel");
const createGradeYear = expressAsyncHandler(async (req, res) => {
  const { gradeName, academicYear } = req.body;
  if (!gradeName || !academicYear) {
    return res.status(400).json({
      status: 400,
      message: "Grade Name and Academic Year are required",
    });
  }
  const academicYearRecord = await AcademicYear.findOne({
    startYear: academicYear.slice(0, 4),
  });
  if (!academicYearRecord) {
    return res.status(404).json({
      status: 404,
      message: "Academic year not found",
    });
  }
  const gradeRecord = await Grade.findOne({ gradeName });
  if (!gradeRecord) {
    return res.status(404).json({
      status: 404,
      message: "Grade not found",
    });
  }
  const gradeYearRecord = await GradeYear.findOne({
    gradeId: gradeRecord._id,
    academicYear_id: academicYearRecord._id,
  });
  if (gradeYearRecord) {
    return res.status(400).json({
      status: 400,
      message: "Grade Year already exists for this grade and academic year",
    });
  }
  const gradeYear = new GradeYear({
    gradeId: gradeRecord._id,
    academicYear_id: academicYearRecord._id,
  });
  await gradeYear.save();
  res.status(201).json({
    status: 201,
    message: "Grade Year created successfully",
    gradeYear,
  });
});
const updateGradeYear = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!validateObjectId(id)) {
    return res.status(400).json({
      status: 400,
      message: "Invalid Grade Year ID",
    });
  }
  const { gradeName, academicYear } = req.body;
  if (!gradeName || !academicYear) {
    return res.status(400).json({
      status: 400,
      message: "Grade Name and Academic Year are required",
    });
  }
  const academicYearRecord = await AcademicYear.findOne({
    startYear: academicYear.slice(0, 4),
  });
  if (!academicYearRecord) {
    return res.status(404).json({
      status: 404,
      message: "Academic year not found",
    });
  }
  const gradeRecord = await Grade.findOne({ gradeName });
  if (!gradeRecord) {
    return res.status(404).json({
      status: 404,
      message: "Grade not found",
    });
  }
  const existsGradeYearRecord = await GradeYear.findOne({
    _id: { $ne: id },
    gradeId: gradeRecord._id,
    academicYear_id: academicYearRecord._id,
  });
  if (existsGradeYearRecord) {
    return res.status(400).json({
      status: 400,
      message: "Grade Year already exists for this grade and academic year",
    });
  }
  const gradeYearRecord = await GradeYear.findByIdAndUpdate(
    id,
    { gradeId: gradeRecord._id, academicYear_id: academicYearRecord._id },
    { new: true }
  );
  if (!gradeYearRecord) {
    return res.status(404).json({
      status: 404,
      message: "Grade Year not found",
    });
  }
  res.status(200).json({
    status: 200,
    message: "Grade Year updated successfully",
    gradeYear: gradeYearRecord,
  });
});
const deleteGradeYear = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!validateObjectId(id)) {
    return res.status(400).json({
      status: 400,
      message: "Invalid Grade Year ID",
    });
  }
  const gradeYearRecord = await GradeYear.findByIdAndDelete(id);
  if (!gradeYearRecord) {
    return res.status(404).json({
      status: 404,
      message: "Grade Year not found",
    });
  }
  res.status(200).json({
    status: 200,
    message: "Grade Year deleted successfully",
  });
});
const getAllGradeYear = expressAsyncHandler(async (req, res) => {
  const gradeYears = await GradeYear.find()
    .populate("gradeId", "gradeName")
    .populate("academicYear_id", "startYear endYear");
  res.status(200).json({
    status: 200,
    message: "Grade Years retrieved successfully",
    gradeYears,
  });
});
const getGradeYear = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!validateObjectId(id)) {
    return res.status(400).json({
      status: 400,
      message: "Invalid Grade Year ID",
    });
  }
  const gradeYear = await GradeYear.findById(id)
    .populate("gradeId", "gradeName")
    .populate("academicYear_id", "startYear endYear");
  if (!gradeYear) {
    return res.status(404).json({
      status: 404,
      message: "Grade Year not found",
    });
  }
  res.status(200).json({
    status: 200,
    message: "Grade Year retrieved successfully",
    gradeYear,
  });
});

module.exports = {
  createGradeYear,
  updateGradeYear,
  deleteGradeYear,
  getAllGradeYear,
  getGradeYear,
};
