const expressAsyncHandler = require("express-async-handler");
const validateObjectId = require("../../utils/validateObjectId");
const classValidationSchema = require("../../validations/classValidation");
const Class = require("../../DB/classModel");
const Grade = require("../../DB/gradeModel");
const AcademicYear = require("../../DB/academicYearModel");

const createClass = expressAsyncHandler(async (req, res) => {
  const { error } = classValidationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      status: 400,
      message: error.details[0].message,
    });
  }

  const { gradeName, academicYear, className } = req.body;

  const startYear = academicYear.slice(0, 4);
  const academicYearRecord = await AcademicYear.findOne({ startYear });
  if (!academicYearRecord) {
    return res.status(404).json({
      status: 404,
      message: "Academic year not found",
    });
  }

  const grade = await Grade.findOne({ gradeName });
  if (!grade) {
    return res.status(404).json({
      status: 404,
      message: "Grade not found",
    });
  }

  const existingClass = await Class.findOne({
    className,
    gradeId: grade._id,
    academicYear_id: academicYearRecord._id,
  });

  if (existingClass) {
    return res.status(400).json({
      status: 400,
      message:
        "Class with the same name, grade, and academic year already exists.",
    });
  }

  const newClass = new Class({
    className,
    gradeId: grade._id,
    academicYear_id: academicYearRecord._id,
  });

  await newClass.save();

  res.status(201).json({
    status: 201,
    message: "Class created successfully",
    newClass,
  });
});

const updateClass = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!validateObjectId(id)) {
    return res.status(400).json({
      status: 400,
      message: "Invalid Class ID",
    });
  }

  const { error } = classValidationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      status: 400,
      message: error.details[0].message,
    });
  }

  const { gradeName, academicYear, className } = req.body;

  const existingClass = await Class.findById(id);
  if (!existingClass) {
    return res.status(404).json({
      status: 404,
      message: "Class not found",
    });
  }

  const startYear = academicYear.slice(0, 4);
  const academicYearRecord = await AcademicYear.findOne({ startYear });
  if (!academicYearRecord) {
    return res.status(404).json({
      status: 404,
      message: "Academic year not found",
    });
  }

  const grade = await Grade.findOne({ gradeName });
  if (!grade) {
    return res.status(404).json({
      status: 404,
      message: "Grade not found",
    });
  }

  const duplicateClass = await Class.findOne({
    _id: { $ne: id },
    className,
    gradeId: grade._id,
    academicYear_id: academicYearRecord._id,
  });

  if (duplicateClass) {
    return res.status(400).json({
      status: 400,
      message:
        "Class with the same name, grade, and academic year already exists.",
    });
  }

  const updatedClass = await Class.findByIdAndUpdate(
    id,
    {
      className,
      gradeId: grade._id,
      academicYear_id: academicYearRecord._id,
    },
    { new: true }
  );

  res.status(200).json({
    status: 200,
    message: "Class updated successfully",
    updatedClass,
  });
});

const deleteClass = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!validateObjectId(id)) {
    return res.status(400).json({
      status: 400,
      message: "Invalid Class ID",
    });
  }

  const existingClass = await Class.findById(id);
  if (!existingClass) {
    return res.status(404).json({
      status: 404,
      message: "Class not found",
    });
  }

  try {
    await Promise.all([
      Student.deleteMany({ classId: id }),
      ClassTeacher.deleteMany({ classId: id }),
    ]);

    await Class.findByIdAndDelete(id);

    res.status(200).json({
      status: 200,
      message: "Class and all related records deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Failed to delete class or related records",
      error: error.message,
    });
  }
});

const getClass = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!validateObjectId(id)) {
    return res.status(400).json({
      status: 400,
      message: "Invalid Class ID",
    });
  }

  const foundClass = await Class.findById(id)
    .populate("gradeId", "gradeName")
    .populate("academicYear_id", "startYear endYear");

  if (!foundClass) {
    return res.status(404).json({
      status: 404,
      message: "Class not found",
    });
  }

  res.status(200).json({
    status: 200,
    message: "Class retrieved successfully",
    foundClass,
  });
});

const getAllClasses = expressAsyncHandler(async (req, res) => {
  const classes = await Class.find()
    .populate("gradeId", "gradeName")
    .populate("academicYear_id", "startYear endYear");

  res.status(200).json({
    status: 200,
    message: "Classes retrieved successfully",
    classes,
  });
});

module.exports = {
  createClass,
  updateClass,
  deleteClass,
  getClass,
  getAllClasses,
};
