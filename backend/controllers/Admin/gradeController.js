const expressAsyncHandler = require("express-async-handler");
const validateObjectId = require("../../utils/validateObjectId");
const gradeValidationSchema = require("../../validations/gradeValidation");
const Grade = require("../../DB/gradeModel");
const GradeSubject = require("../../DB/gradeSubject");
const GradeYear = require("../../DB/gradeYearModel");
const Schedule = require("../../DB/schedule");
const GradeSubjectSemester = require("../../DB/gradeSubjectSemester");
const Student = require("../../DB/student"); // Fixed casing

const createGrade = expressAsyncHandler(async (req, res) => {
  const { error } = gradeValidationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      status: 400,
      message: error.details[0].message,
    });
  }

  const { gradeName } = req.body;

  const existingGrade = await Grade.findOne({
    gradeName: { $regex: new RegExp(`^${gradeName}$`, "i") },
  });

  if (existingGrade) {
    return res.status(409).json({
      status: 409,
      message: "Grade already exists",
    });
  }

  const grade = await Grade.create({ gradeName });

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
    gradeName: { $regex: new RegExp(`^${gradeName}$`, "i") },
  });

  if (existingGrade) {
    return res.status(409).json({
      status: 409,
      message: "Grade already exists",
    });
  }

  const grade = await Grade.findByIdAndUpdate(
    id,
    { gradeName },
    { new: true, runValidators: true }
  );

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
      message: "Invalid grade ID",
    });
  }

  const grade = await Grade.findById(id);
  if (!grade) {
    return res.status(404).json({
      status: 404,
      message: "Grade not found",
    });
  }

  try {
    const gradeSubjects = await GradeSubject.find({ gradeId: id });

    await Promise.all([
      GradeSubjectSemester.deleteMany({
        gradeSubjectId: { $in: gradeSubjects.map((gs) => gs._id) },
      }),

      GradeSubject.deleteMany({ gradeId: id }),

      Schedule.deleteMany({ grade_id: id }),
      GradeYear.deleteMany({ gradeId: id }),
      Student.deleteMany({ gradeId: id }),
    ]);

    await Grade.findByIdAndDelete(id);

    res.status(200).json({
      status: 200,
      message: "Grade and all related records deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Failed to delete grade",
      error: error.message,
    });
  }
});

const getGrade = expressAsyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    if (!validateObjectId(id)) {
      return res.status(400).json({
        status: 400,
        message: "Invalid grade ID",
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
  } catch (error) {
    console.log(`Failed ${error.message}`);
    res.json({ message: `Failed ${error.message}` });
  }
});

const getAllGrade = expressAsyncHandler(async (req, res) => {
  try {
    const grades = await Grade.find().sort({ gradeName: 1 });
    res.status(200).json({
      status: 200,
      message: "Grades retrieved successfully",
      grades,
    });
  } catch (error) {
    console.log(`Failed ${error.message}`);
    res.json({ message: `Failed ${error.message}` });
  }
});

module.exports = {
  createGrade,
  updateGrade,
  deleteGrade,
  getAllGrade,
  getGrade,
};
