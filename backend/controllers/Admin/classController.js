const expressAsyncHandler = require("express-async-handler");
const validateObjectId = require("../../utils/validateObjectId");
const classValidationSchema = require("../../validations/classValidation");
const Class = require("../../DB/classModel");
const Grade = require("../../DB/gradeModel");
const AcademicYear = require("../../DB/academicYearModel");
const Student = require("../../DB/student");
const ClassTeacher = require("../../DB/classTeacherModel");

const populateClass = (query) =>
  query
    .populate("gradeId", "gradeName")
    .populate("academicYear_id", "startYear endYear");

const createClass = expressAsyncHandler(async (req, res) => {
  const { error } = classValidationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      status: 400,
      message: error.details[0].message,
    });
  }

  const { gradeName, academicYear, className } = req.body;

  const [startYear, endYear] = academicYear.split("-");
  if (
    !startYear ||
    !endYear ||
    startYear.length !== 4 ||
    endYear.length !== 4
  ) {
    return res.status(400).json({
      status: 400,
      message: "Invalid academic year format. Use YYYY-YYYY",
    });
  }

  const [academicYearRecord, grade] = await Promise.all([
    AcademicYear.findOne({ startYear, endYear }),
    Grade.findOne({ gradeName }),
  ]);

  if (!academicYearRecord) {
    return res.status(404).json({
      status: 404,
      message: "Academic year not found",
    });
  }

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
    return res.status(409).json({
      status: 409,
      message:
        "Class with the same name, grade, and academic year already exists",
    });
  }

  const newClass = await Class.create({
    className,
    gradeId: grade._id,
    academicYear_id: academicYearRecord._id,
  });

  const populatedClass = await populateClass(Class.findById(newClass._id));

  res.status(201).json({
    status: 201,
    message: "Class created successfully",
    newClass: populatedClass,
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

  const [startYear, endYear] = academicYear.split("-");
  if (
    !startYear ||
    !endYear ||
    startYear.length !== 4 ||
    endYear.length !== 4
  ) {
    return res.status(400).json({
      status: 400,
      message: "Invalid academic year format. Use YYYY-YYYY",
    });
  }

  const [existingClass, academicYearRecord, grade] = await Promise.all([
    Class.findById(id),
    AcademicYear.findOne({ startYear, endYear }),
    Grade.findOne({ gradeName }),
  ]);

  if (!existingClass) {
    return res.status(404).json({
      status: 404,
      message: "Class not found",
    });
  }

  if (!academicYearRecord) {
    return res.status(404).json({
      status: 404,
      message: "Academic year not found",
    });
  }

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
    return res.status(409).json({
      status: 409,
      message:
        "Class with the same name, grade, and academic year already exists",
    });
  }

  const updatedClass = await Class.findByIdAndUpdate(
    id,
    {
      className,
      gradeId: grade._id,
      academicYear_id: academicYearRecord._id,
    },
    { new: true, runValidators: true }
  );

  const populatedClass = await populateClass(Class.findById(updatedClass._id));

  res.status(200).json({
    status: 200,
    message: "Class updated successfully",
    updatedClass: populatedClass,
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
      // Add other related deletions here if needed
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

  const foundClass = await populateClass(Class.findById(id));

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
  const classes = await populateClass(Class.find());

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
