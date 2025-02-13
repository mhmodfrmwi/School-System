const Contest = require("../../DB/contestModel");
const validateObjectId = require("../../utils/validateObjectId");
const ClassTeacher = require("../../DB/classTeacherModel");
const AcademicYear = require("../../DB/academicYearModel");
const Semester = require("../../DB/semesterModel");
const Subject = require("../../DB/subjectModel");
const Class = require("../../DB/classModel");
const Grade = require("../../DB/gradeModel");
const moment = require("moment");
const expressAsyncHandler = require("express-async-handler");
const contestValidationSchema = require("../../validations/contestValidation");

const createContest = expressAsyncHandler(async (req, res) => {
  const teacherId = req.user.id;
  const { title, startDate, endDate, numberOfTeamMembers, requirements, subjectName, className, gradeName } = req.body;

  const { error } = contestValidationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ status: 400, message: error.details[0].message });
  }

  const subject = await Subject.findOne({ subjectName });
  if (!subject) {
    return res.status(404).json({ status: 404, message: "Subject not found" });
  }

  const grade = await Grade.findOne({ gradeName });
  if (!grade) {
    return res.status(404).json({ status: 404, message: "Grade not found" });
  }

  const classData = await Class.findOne({ className, gradeId: grade._id });
  if (!classData) {
    return res.status(404).json({ status: 404, message: "Class not found for the given grade" });
  }

  const currentYear = moment().year().toString().slice(-2);
  const currentMonth = moment().month() + 1;
  let startYear, endYear;
  if (currentMonth >= 9 && currentMonth <= 12) {
    startYear = "20" + parseInt(currentYear);
    endYear = "20" + (parseInt(currentYear) + 1);
  } else {
    startYear = "20" + (parseInt(currentYear) - 1);
    endYear = "20" + parseInt(currentYear);
  }
  let semesterName = currentMonth >= 9 && currentMonth <= 12 ? "Semester 1" : "Semester 2";

  const academicYear = await AcademicYear.findOne({ startYear, endYear });
  if (!academicYear) {
    return res.status(404).json({ status: 404, message: "Academic year not found" });
  }

  const semester = await Semester.findOne({ semesterName, academicYear_id: academicYear._id });
  if (!semester) {
    return res.status(404).json({ status: 404, message: "Semester not found in the given academic year" });
  }

  const classTeacher = await ClassTeacher.findOne({
    teacherId,
    subjectId: subject._id,
    academicYear_id: academicYear._id,
    semester_id: semester._id,
    classId: classData._id,
  });

  if (!classTeacher) {
    return res.status(403).json({ status: 403, message: "Teacher is not assigned to this class for the given subject" });
  }

  const contest = new Contest({
    title,
    teacherId,
    startDate,
    endDate,
    numberOfTeamMembers,
    requirements,
    subjectId: subject._id,
    academicYearId: academicYear._id,
    semesterId: semester._id,
    gradeId: grade._id,
    classId: classData._id,
  });

  await contest.save();

  res.status(201).json({ status: 201, message: "Contest created successfully", contest });
});

const updateContest = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const teacherId = req.user.id;

  if (!validateObjectId(id)) {
    return res.status(400).json({ status: 400, message: "Invalid Contest ID" });
  }

  let contest = await Contest.findById(id);
  if (!contest) {
    return res.status(404).json({ status: 404, message: "Contest not found" });
  }

  if (contest.teacherId.toString() !== teacherId) {
    return res.status(403).json({ status: 403, message: "Unauthorized to update this contest" });
  }

  const { error } = contestValidationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ status: 400, message: error.details[0].message });
  }

  const { title, startDate, endDate, numberOfTeamMembers, requirements, subjectName, className, gradeName } = req.body;

  const subject = await Subject.findOne({ subjectName });
  if (!subject) {
    return res.status(404).json({ status: 404, message: "Subject not found" });
  }

  const grade = await Grade.findOne({ gradeName });
  if (!grade) {
    return res.status(404).json({ status: 404, message: "Grade not found" });
  }

  const classData = await Class.findOne({ className, gradeId: grade._id });
  if (!classData) {
    return res.status(404).json({ status: 404, message: "Class not found for the given grade" });
  }

  const currentYear = moment().year().toString().slice(-2);
  const currentMonth = moment().month() + 1;
  let startYear, endYear;
  if (currentMonth >= 9 && currentMonth <= 12) {
    startYear = "20" + parseInt(currentYear);
    endYear = "20" + (parseInt(currentYear) + 1);
  } else {
    startYear = "20" + (parseInt(currentYear) - 1);
    endYear = "20" + parseInt(currentYear);
  }
  let semesterName = currentMonth >= 9 && currentMonth <= 12 ? "Semester 1" : "Semester 2";

  const academicYear = await AcademicYear.findOne({ startYear, endYear });
  if (!academicYear) {
    return res.status(404).json({ status: 404, message: "Academic year not found" });
  }

  const semester = await Semester.findOne({ semesterName, academicYear_id: academicYear._id });
  if (!semester) {
    return res.status(404).json({ status: 404, message: "Semester not found in the given academic year" });
  }

  const classTeacher = await ClassTeacher.findOne({
    teacherId,
    subjectId: subject._id,
    academicYear_id: academicYear._id,
    semester_id: semester._id,
    classId: classData._id,
  });

  if (!classTeacher) {
    return res.status(403).json({ status: 403, message: "Teacher is not assigned to this class for the given subject" });
  }

  contest.title = title;
  contest.startDate = startDate;
  contest.endDate = endDate;
  contest.numberOfTeamMembers = numberOfTeamMembers;
  contest.requirements = requirements;
  contest.subjectId = subject._id;
  contest.academicYearId = academicYear._id;
  contest.semesterId = semester._id;
  contest.gradeId = grade._id;
  contest.classId = classData._id;

  await contest.save();

  res.status(200).json({ status: 200, message: "Contest updated successfully", contest });
});
;

const getAllContests = expressAsyncHandler(async (req, res) => {
  const contests = await Contest.find()
  .populate("teacherId", "fullName")
  .populate("subjectId")
  .populate("gradeId")
  .populate("classId");

  res.status(200).json({
    status: 200,
    message: "Contests retrieved successfully",
    contests,
  });
});

const getContest = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!validateObjectId(id)) {
    return res.status(400).json({
      status: 400,
      message: "Invalid Contest ID",
    });
  }

  const contest = await Contest.findById(id)
  .populate("teacherId", "fullName")
  .populate("subjectId")
  .populate("gradeId")
  .populate("classId");

  if (!contest) {
    return res.status(404).json({
      status: 404,
      message: "Contest not found",
    });
  }

  res.status(200).json({
    status: 200,
    message: "contest retrieved successfully",
    contest,
  });
});

const deleteContest = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!validateObjectId(id)) {
    return res.status(400).json({
      status: 400,
      message: "Invalid Contest ID",
    });
  }
  const contest = await Contest.findById(id);

  if (!contest) {
    return res.status(404).json({ status: 404, message: "Contest not found" });
  }

  if (contest.teacherId.toString() !== req.user.id) {
    return res
      .status(403)
      .json({ message: "Unauthorized to delete this contest" });
  }

  await contest.deleteOne();
  res
    .status(200)
    .json({ status: 200, message: "Contest deleted successfully" });
});

module.exports = {
  createContest,
  getAllContests,
  getContest,
  updateContest,
  deleteContest,
};