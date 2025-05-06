const expressAsyncHandler = require("express-async-handler");
const validateObjectId = require("../../utils/validateObjectId");
const semesterValidationSchema = require("../../validations/semesterValidation");
const AcademicYear = require("../../DB/academicYearModel");
const Semester = require("../../DB/semesterModel");
const GradeSubjectSemester = require("../../DB/GradeSubjectSemesterModel");

const createSemester = expressAsyncHandler(async (req, res) => {
  const { error } = semesterValidationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      status: 400,
      message: error.details[0].message,
    });
  }

  const { academicYear, semesterName } = req.body;

  const startYear = academicYear.slice(0, 4);
  const academicYearRecord = await AcademicYear.findOne({ startYear });

  if (!academicYearRecord) {
    return res.status(404).json({
      status: 404,
      message: "Academic year not found",
    });
  }

  const existingSemester = await Semester.findOne({
    academicYear_id: academicYearRecord._id,
    semesterName,
  });

  if (existingSemester) {
    return res.status(400).json({
      status: 400,
      message:
        "Semester with the same name already exists for this academic year.",
    });
  }

  const semester = new Semester({
    academicYear_id: academicYearRecord._id,
    semesterName,
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

  const { academicYear, semesterName } = req.body;

  const startYear = academicYear.slice(0, 4);
  const academicYearRecord = await AcademicYear.findOne({ startYear });

  if (!academicYearRecord) {
    return res.status(404).json({
      status: 404,
      message: "Academic year not found",
    });
  }

  const existingSemester = await Semester.findOne({
    _id: { $ne: id },
    academicYear_id: academicYearRecord._id,
    semesterName,
  });

  if (existingSemester) {
    return res.status(400).json({
      status: 400,
      message:
        "Semester with the same name already exists for this academic year.",
    });
  }

  const semester = await Semester.findByIdAndUpdate(
    id,
    {
      academicYear_id: academicYearRecord._id,
      semesterName,
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

  try {
    await GradeSubjectSemester.deleteMany({ semester_id: id });

    res.status(200).json({
      status: 200,
      message: "Semester and all related records deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Failed to delete semester or related records",
      error: error.message,
    });
  }
});

const getSemester = expressAsyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    if (!validateObjectId(id)) {
      return res.status(400).json({
        status: 400,
        message: "Invalid Semester ID",
      });
    }

    const semester = await Semester.findById(id).populate("academicYear_id");

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
  } catch (error) {
    console.log(`Failed ${error.message}`);
    res.json({ message: `Failed ${error.message}` });
  }
});

const getAllSemester = expressAsyncHandler(async (req, res) => {
  try {
    const semesters = await Semester.find().populate("academicYear_id");
    res.status(200).json({
      status: 200,
      message: "Semesters retrieved successfully",
      semesters,
    });
  } catch (error) {
    console.log(`Failed ${error.message}`);
    res.json({ message: `Failed ${error.message}` });
  }
});

module.exports = {
  createSemester,
  updateSemester,
  deleteSemester,
  getAllSemester,
  getSemester,
};
