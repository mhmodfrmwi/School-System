const expressAsyncHandler = require("express-async-handler");
const validateObjectId = require("../utils/validateObjectId");
const academicYearValidationSchema = require("../validations/academicYearValidation");
const AcademicYear = require("../DB/academicYearModel");
const ClassTeacher = require("../DB/classTeacherModel");
const GradeSubject = require("../DB/gradeSubject");
const GradeYear = require("../DB/gradeYearModel");
const Schedule = require("../DB/schedule");
const Semester = require("../DB/semesterModel");
const GradeSubjectSemester = require("../DB/gradeSubjectSemester");
const student = require("../DB/student");

const createAcademicYear = expressAsyncHandler(async (req, res) => {
  const { error } = academicYearValidationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      status: 400,
      message: error.details[0].message,
    });
  }
  const { startYear, endYear } = req.body;
  if (startYear > endYear) {
    return res.status(400).json({
      status: 400,
      message: "Start year must be less than or equal to end year.",
    });
  }
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
      message: "Invalid academic year ID",
    });
  }

  const academicYear = await AcademicYear.findByIdAndDelete(id);
  if (!academicYear) {
    return res.status(404).json({
      status: 404,
      message: "Academic year not found",
    });
  }

  try {
    await Promise.all([
      ClassTeacher.deleteMany({ academicYear_id: id }),
      GradeSubject.deleteMany({ academicYear_id: id }),
      GradeYear.deleteMany({ academicYear_id: id }),
      Schedule.deleteMany({ academic_year_id: id }),
      Semester.deleteMany({ academicYear_id: id }),
      student.deleteMany({ academicYear_id: id }),
    ]);

    const gradeSubjects = await GradeSubject.find({ academicYear_id: id });

    await Promise.all(
      gradeSubjects.map(async (gradeSubject) => {
        await GradeYear.deleteMany({ gradeSubject_id: gradeSubject._id });
        await GradeSubjectSemester.deleteMany({
          grade_subject_id: gradeSubject._id,
        });
      })
    );

    const semesters = await Semester.find({ academicYear_id: id });

    await Promise.all(
      semesters.map(async (semester) => {
        await GradeSubjectSemester.deleteMany({ semester_id: semester._id });
        await Schedule.deleteMany({ semester_id: semester._id });
      })
    );

    res.status(200).json({
      status: 200,
      message: "Academic year and all related records deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Failed to delete academic year or related records",
      error: error.message,
    });
  }
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
