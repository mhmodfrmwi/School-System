const expressAsyncHandler = require("express-async-handler");
const validateObjectId = require("../../utils/validateObjectId");
const Material = require("../../DB/materielModel");
const AcademicYear = require("../../DB/academicYearModel");
const Grade = require("../../DB/gradeModel");
const Subject = require("../../DB/subjectModel");
const Semester = require("../../DB/semesterModel");
const materialValidationSchema = require("../../validations/materialValidation");
const createMateriel = expressAsyncHandler(async (req, res) => {
  const { error } = materialValidationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      status: 400,
      message: error.details[0].message,
    });
  }
  const title = req.body.title;
  const type = req.body.type;
  const file_url = req.body.fileUrl;
  const uploaded_by = req.user.id;
  const academicYearName = req.body.academicYear;
  const academic_year = await AcademicYear.findOne({
    startYear: academicYearName.slice(0, 4),
  });
  if (!academic_year) {
    return res.status(404).json({
      status: 404,
      message: "Academic year not found",
    });
  }
  const academic_year_id = academic_year._id;

  const gradeName = req.body.grade;
  const grade = await Grade.findOne({ gradeName });
  if (!grade) {
    return res.status(404).json({
      status: 404,
      message: "Grade not found",
    });
  }
  const grade_id = grade._id;
  const subjectName = req.body.subject;
  const subject = await Subject.findOne({ subjectName });
  if (!subject) {
    return res.status(404).json({
      status: 404,
      message: "Subject not found",
    });
  }
  const subject_id = subject._id;
  const semesterName = req.body.semester;
  const semester = await Semester.findOne({
    semesterName,
    academicYear_id: academic_year_id,
  });
  if (!semester) {
    return res.status(404).json({
      status: 404,
      message: "Semester not found in the given academic year",
    });
  }
  const semester_id = semester._id;
  const materiel = new Material({
    title,
    type,
    file_url,
    uploaded_by,
    grade_id,
    subject_id,
    academic_year_id,
    semester_id,
  });
  await materiel.save();
  res.status(201).json(materiel);
});
const updateMateriel = expressAsyncHandler(async (req, res) => {});
const deleteMateriel = expressAsyncHandler(async (req, res) => {});
const getMaterielById = expressAsyncHandler(async (req, res) => {});
const getAllMateriels = expressAsyncHandler(async (req, res) => {});

module.exports = {
  createMateriel,
  updateMateriel,
  deleteMateriel,
  getMaterielById,
  getAllMateriels,
};
