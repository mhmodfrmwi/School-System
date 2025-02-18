const expressAsyncHandler = require("express-async-handler");
const validateObjectId = require("../../utils/validateObjectId");
const gradeSubjectSemesterValidationSchema = require("../../validations/gradeSubjectSemesterValidation");
const gradeSubjectValidationSchema = require("../../validations/gradeSubjectValidation");
const GradeSubject = require("../../DB/gradeSubject");
const Semester = require("../../DB/semesterModel");
const GradeSubjectSemester = require("../../DB/gradeSubjectSemester");
const Grade = require("../../DB/gradeModel");
const Subject = require("../../DB/subjectModel");
const AcademicYear = require("../../DB/academicYearModel");

async function createGradeSubject(gradeId, subjectId, academicYearId) {
  const existingGradeSubject = await GradeSubject.findOne({
    gradeId,
    subjectId,
    academicYear_id: academicYearId,
  });

  if (existingGradeSubject) {
    return existingGradeSubject._id;
  }

  const gradeSubject = new GradeSubject({
    gradeId,
    subjectId,
    academicYear_id: academicYearId,
  });

  const savedGradeSubject = await gradeSubject.save();
  return savedGradeSubject._id;
}

const createGradeSubjectSemester = expressAsyncHandler(async (req, res) => {
  const { error } = gradeSubjectValidationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      status: 400,
      message: error.details[0].message,
    });
  }

  const { gradeName, subjectName, academicYear, semesterName } = req.body;

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

  const subject = await Subject.findOne({ subjectName });
  if (!subject) {
    return res.status(404).json({
      status: 404,
      message: "Subject not found",
    });
  }

  const semester = await Semester.findOne({
    semesterName,
    academicYear_id: academicYearRecord._id,
  });
  if (!semester) {
    return res.status(404).json({
      status: 404,
      message: "Semester not found",
    });
  }

  try {
    const gradeId = grade._id;
    const subjectId = subject._id;
    const academicYearId = academicYearRecord._id;

    const grade_subject_id = await createGradeSubject(
      gradeId,
      subjectId,
      academicYearId
    );

    const existingGradeSubjectSemester = await GradeSubjectSemester.findOne({
      grade_subject_id,
      semester_id: semester._id,
    });

    if (existingGradeSubjectSemester) {
      return res.status(400).json({
        status: 400,
        message:
          "GradeSubjectSemester with the same grade, subject, and semester already exists.",
      });
    }

    const gradeSubjectSemester = new GradeSubjectSemester({
      grade_subject_id,
      semester_id: semester._id,
    });

    await gradeSubjectSemester.save();

    res.status(201).json({
      status: 201,
      message: "GradeSubjectSemester created successfully",
      gradeSubjectSemester,
    });
  } catch (error) {
    console.error("Error creating GradeSubjectSemester:", error);
    res.status(500).json({
      status: 500,
      message: "Internal server error",
    });
  }
});

const updateGradeSubjectSemester = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!validateObjectId(id)) {
    return res.status(400).json({
      status: 400,
      message: "Invalid GradeSubjectSemester ID",
    });
  }

  const { error } = gradeSubjectValidationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      status: 400,
      message: error.details[0].message,
    });
  }

  const { gradeName, subjectName, academicYear, semesterName } = req.body;

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

  const subject = await Subject.findOne({ subjectName });
  if (!subject) {
    return res.status(404).json({
      status: 404,
      message: "Subject not found",
    });
  }

  const semester = await Semester.findOne({
    semesterName,
    academicYear_id: academicYearRecord._id,
  });
  if (!semester) {
    return res.status(404).json({
      status: 404,
      message: "Semester not found",
    });
  }

  const gradeSubjectSemester = await GradeSubjectSemester.findById(id);
  if (!gradeSubjectSemester) {
    return res.status(404).json({
      status: 404,
      message: "GradeSubjectSemester not found",
    });
  }

  const gradeSubjectId = gradeSubjectSemester.grade_subject_id;

  const updatedGradeSubject = await GradeSubject.findByIdAndUpdate(
    gradeSubjectId,
    {
      gradeId: grade._id,
      subjectId: subject._id,
      academicYear_id: academicYearRecord._id,
    },
    { new: true }
  );

  if (!updatedGradeSubject) {
    return res.status(404).json({
      status: 404,
      message: "GradeSubject not found or could not be updated",
    });
  }

  const existingGradeSubjectSemester = await GradeSubjectSemester.findOne({
    _id: { $ne: id },
    grade_subject_id: updatedGradeSubject._id,
    semester_id: semester._id,
  });

  if (existingGradeSubjectSemester) {
    return res.status(400).json({
      status: 400,
      message:
        "GradeSubjectSemester with the same grade, subject, and semester already exists.",
    });
  }

  const updatedGradeSubjectSemester =
    await GradeSubjectSemester.findByIdAndUpdate(
      id,
      {
        grade_subject_id: updatedGradeSubject._id,
        semester_id: semester._id,
      },
      { new: true }
    );

  res.status(200).json({
    status: 200,
    message: "GradeSubjectSemester updated successfully",
    gradeSubjectSemester: updatedGradeSubjectSemester,
  });
});

const deleteGradeSubjectSemester = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!validateObjectId(id)) {
    return res.status(400).json({
      status: 400,
      message: "Invalid GradeSubjectSemester ID",
    });
  }

  const gradeSubjectSemester = await GradeSubjectSemester.findById(id);

  if (!gradeSubjectSemester) {
    return res.status(404).json({
      status: 404,
      message: "GradeSubjectSemester not found",
    });
  }

  const { grade_subject_id } = gradeSubjectSemester;

  try {
    await GradeSubjectSemester.findByIdAndDelete(id);

    if (validateObjectId(grade_subject_id)) {
      await GradeSubject.findByIdAndDelete(grade_subject_id);
    }

    res.status(200).json({
      status: 200,
      message: "GradeSubject and GradeSubjectSemester deleted successfully",
    });
  } catch (error) {
    console.error(
      "Error deleting GradeSubject and GradeSubjectSemester:",
      error
    );
    res.status(500).json({
      status: 500,
      message: "Internal server error",
    });
  }
});

const getGradeSubjectSemester = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!validateObjectId(id)) {
    return res.status(400).json({
      status: 400,
      message: "Invalid GradeSubjectSemester ID",
    });
  }

  const gradeSubjectSemester = await GradeSubjectSemester.findById(id).populate(
    [
      {
        path: "grade_subject_id",
        populate: { path: "subjectId", path: "gradeId" },
      },
      { path: "semester_id", populate: { path: "academicYear_id" } },
    ]
  );

  if (!gradeSubjectSemester) {
    return res.status(404).json({
      status: 404,
      message: "GradeSubjectSemester not found",
    });
  }

  res.status(200).json({
    status: 200,
    message: "GradeSubject retrieved successfully",
    gradeSubjectSemester,
  });
});

// Get all GradeSubjects
const getAllGradeSubjectSemesters = expressAsyncHandler(async (req, res) => {
  const gradeSubjectSemesters = await GradeSubjectSemester.find().populate([
    { path: "grade_subject_id", populate: { path: "subjectId" } },
    { path: "semester_id", populate: { path: "academicYear_id" } },
  ]);

  res.status(200).json({
    status: 200,
    message: "GradeSubjectSemesters retrieved successfully",
    gradeSubjectSemesters,
  });
});
module.exports = {
  createGradeSubjectSemester,
  deleteGradeSubjectSemester,
  updateGradeSubjectSemester,
  getGradeSubjectSemester,
  getAllGradeSubjectSemesters,
};
