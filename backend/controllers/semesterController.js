const expressAsyncHandler = require("express-async-handler");
const validateObjectId = require("../utils/validateObjectId");
const semesterValidationSchema = require("../validations/semesterValidation");
const AcademicYear = require("../DB/academicYearModel");
const Semester = require("../DB/semesterModel");

const createSemester = expressAsyncHandler(async (req, res) => {
  const { error } = semesterValidationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      status: 400,
      message: error.details[0].message,
    });
  }
  const startYear = req.body.academicYear.slice(0, 4);
  const academicYear = await AcademicYear.findOne({ startYear });
  if (!academicYear) {
    return res.status(404).json({
      status: 404,
      message: "Academic year not found",
    });
  }

  const semester = new Semester({
    academicYear_id: academicYear._id,
    semesterName: req.body.semesterName,
  });

  await semester.save();

  res.status(201).json({
    status: 201,
    message: "Semester created successfully",
    semester,
  });
});

const updateSemester = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!validateObjectId(id)) {
    return res.status(400).json({
      status: 400,
      message: "Invalid Semester ID",
    });
  }

  const { error } = semesterValidationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      status: 400,
      message: error.details[0].message,
    });
  }

  const startYear = req.body.academicYear.slice(0, 4);
  const academicYear = await AcademicYear.findOne({ startYear });
  if (!academicYear) {
    return res.status(404).json({
      status: 404,
      message: "Academic year not found",
    });
  }

  const semester = await Semester.findByIdAndUpdate(
    id,
    {
      academicYear_id: academicYear._id,
      semesterName: req.body.semesterName,
    },
    { new: true }
  );

  if (!semester) {
    return res.status(404).json({
      status: 404,
      message: "Semester not found",
    });
  }

  res.status(200).json({
    status: 200,
    message: "Semester updated successfully",
    semester,
  });
});

const deleteSemester = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!validateObjectId(id)) {
    return res.status(400).json({
      status: 400,
      message: "Invalid Semester ID",
    });
  }

  const semester = await Semester.findByIdAndDelete(id);

  if (!semester) {
    return res.status(404).json({
      status: 404,
      message: "Semester not found",
    });
  }

  res.status(200).json({
    status: 200,
    message: "Semester deleted successfully",
  });
});

const getSemester = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!validateObjectId(id)) {
    return res.status(400).json({
      status: 400,
      message: "Invalid Semester ID",
    });
  }

  const semester = await Semester.findById(id);

  if (!semester) {
    return res.status(404).json({
      status: 404,
      message: "Semester not found",
    });
  }

  res.status(200).json({
    status: 200,
    message: "Semester retrieved successfully",
    semester,
  });
});

const getAllSemester = expressAsyncHandler(async (req, res) => {
  const semesters = await Semester.find();
  res.status(200).json({
    status: 200,
    message: "Semesters retrieved successfully",
    semesters,
  });
});

module.exports = {
  createSemester,
  updateSemester,
  deleteSemester,
  getAllSemester,
  getSemester,
};
