const expressAsyncHandler = require("express-async-handler");
const validateObjectId = require("../utils/validateObjectId");
const classValidationSchema = require("../validations/classValidation");
const Class = require("../DB/classModel");
const Grade = require("../DB/gradeModel");
const AcademicYear = require("../DB/academicYearModel");



// Create a Class
const createClass = expressAsyncHandler(async (req, res) => {
  const { error } = classValidationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      status: 400,
      message: error.details[0].message,
    });
  }

  const { gradeName, academicYear, class_name} = req.body;

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

  const newClass = new Class({
    class_name,
    grade_id:grade._id,
    academic_year_id:academicYearRecord._id,
  });

  await newClass.save();

  res.status(201).json({
    status: 201,
    message: "Class created successfully",
    newClass,
  });
});



// Update a Class
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

  const { gradeName, academicYear, class_name } = req.body;

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

  const updatedClass = await Class.findByIdAndUpdate(
    id,
    {
      class_name,
      grade_id: grade._id,
      academic_year_id: academicYearRecord._id,
    },
    { new: true }
  );

  res.status(200).json({
    status: 200,
    message: "Class updated successfully",
    updatedClass,
  });
});

// Delete a Class
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

  await Class.findByIdAndDelete(id);

  res.status(200).json({
    status: 200,
    message: "Class deleted successfully",
  });
});

// Get a Single Class
const getClass = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!validateObjectId(id)) {
    return res.status(400).json({
      status: 400,
      message: "Invalid Class ID",
    });
  }

  const foundClass = await Class.findById(id);

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

// Get All Classes
const getAllClasses = expressAsyncHandler(async (req, res) => {
  const classes = await Class.find();

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
