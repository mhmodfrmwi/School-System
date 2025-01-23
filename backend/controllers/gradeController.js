const expressAsyncHandler = require("express-async-handler");
const validateObjectId = require("../utils/validateObjectId");
const gradeValidationSchema = require("../validations/gradeValidation");
const Grade = require("../DB/gradeModel");

const createGrade = expressAsyncHandler(async (req, res) => {
  const { error } = gradeValidationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      status: 400,
      message: error.details[0].message,
    });
  }

  const { gradeName } = req.body;

  const existingGrade = await Grade.findOne({ gradeName });

  if (existingGrade) {
    return res.status(400).json({
      status: 400,
      message: "Grade with the same name already exists.",
    });
  }

  const grade = new Grade({
    gradeName,
  });

  await grade.save();

  res.status(201).json({
    status: 201,
    message: "Grade created successfully",
    grade,
  });
});

const updateGrade = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!validateObjectId(id)) {
    return res.status(400).json({
      status: 400,
      message: "Invalid Grade ID",
    });
  }

  const { error } = gradeValidationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      status: 400,
      message: error.details[0].message,
    });
  }

  const { gradeName } = req.body;

  const existingGrade = await Grade.findOne({
    _id: { $ne: id },
    gradeName,
  });

  if (existingGrade) {
    return res.status(400).json({
      status: 400,
      message: "Grade with the same name already exists.",
    });
  }

  const grade = await Grade.findByIdAndUpdate(id, { gradeName }, { new: true });

  if (!grade) {
    return res.status(404).json({
      status: 404,
      message: "Grade not found",
    });
  }

  res.status(200).json({
    status: 200,
    message: "Grade updated successfully",
    grade,
  });
});

const deleteGrade = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!validateObjectId(id)) {
    return res.status(400).json({
      status: 400,
      message: "Error getting this page",
    });
  }

  const grade = await Grade.findByIdAndDelete(id);

  if (!grade) {
    return res.status(404).json({
      status: 404,
      message: "Grade not found",
    });
  }

  res.status(200).json({
    status: 200,
    message: "Grade deleted successfully",
  });
});

const getGrade = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!validateObjectId(id)) {
    return res.status(400).json({
      status: 400,
      message: "Error getting this page",
    });
  }

  const grade = await Grade.findById(id);

  if (!grade) {
    return res.status(404).json({
      status: 404,
      message: "Grade not found",
    });
  }

  res.status(200).json({
    status: 200,
    message: "Grade retrieved successfully",
    grade,
  });
});

const getAllGrade = expressAsyncHandler(async (req, res) => {
  const grades = await Grade.find();
  res.status(200).json({
    status: 200,
    message: "Grades retrieved successfully",
    grades,
  });
});

module.exports = {
  createGrade,
  updateGrade,
  deleteGrade,
  getAllGrade,
  getGrade,
};
