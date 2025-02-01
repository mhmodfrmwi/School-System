const expressAsyncHandler = require("express-async-handler");
const validateObjectId = require("../../utils/validateObjectId");
const questionValidationSchema = require("../../validations/questionBankValidation");
const Question = require("../../DB/questionBankModel");
const Subject = require("../../DB/subjectModel");
const Grade = require("../../DB/gradeModel");
const Semester = require("../../DB/semesterModel");
const Teacher = require("../../DB/teacher");

const createQuestion = expressAsyncHandler(async (req, res) => {
  const { error } = questionValidationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      status: 400,
      message: error.details[0].message,
    });
  }

  const { questionType, questionText, subjectName, gradeName, semesterName, teacherName, answer } = req.body;

  const subject = await Subject.findOne({ subjectName });
  if (!subject) {
    return res.status(404).json({
      status: 404,
      message: "Subject not found",
    });
  }

  const grade = await Grade.findOne({ gradeName });
  if (!grade) {
    return res.status(404).json({
      status: 404,
      message: "Grade not found",
    });
  }

  const semester = await Semester.findOne({ semesterName });
  if (!semester) {
    return res.status(404).json({
      status: 404,
      message: "Semester not found",
    });
  }

  const teacher = await Teacher.findOne({ fullName: teacherName });
  if (!teacher) {
    return res.status(404).json({
      status: 404,
      message: "Teacher not found",
    });
  }

  const existingQuestion = await Question.findOne({
    questionText,
    subjectId: subject._id,
    gradeId: grade._id,
    semesterId: semester._id,
    teacherId: teacher._id,
  });

  if (existingQuestion) {
    return res.status(400).json({
      status: 400,
      message: "Question with the same text and details already exists",
    });
  }

  const newQuestion = new Question({
    questionType,
    questionText,
    subjectId: subject._id,
    gradeId: grade._id,
    semesterId: semester._id,
    teacherId: teacher._id,
    answer,
  });

  await newQuestion.save();

  res.status(201).json({
    status: 201,
    message: "Question created successfully",
    newQuestion,
  });
});

const updateQuestion = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!validateObjectId(id)) {
    return res.status(400).json({
      status: 400,
      message: "Invalid Question ID",
    });
  }

  const { error } = questionValidationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      status: 400,
      message: error.details[0].message,
    });
  }

  const { questionType, questionText, subjectName, gradeName, semesterName, teacherName, answer } = req.body;

  const existingQuestion = await Question.findById(id);
  if (!existingQuestion) {
    return res.status(404).json({
      status: 404,
      message: "Question not found",
    });
  }

  const subject = await Subject.findOne({ subjectName });
  if (!subject) {
    return res.status(404).json({
      status: 404,
      message: "Subject not found",
    });
  }

  const grade = await Grade.findOne({ gradeName });
  if (!grade) {
    return res.status(404).json({
      status: 404,
      message: "Grade not found",
    });
  }

  const semester = await Semester.findOne({ semesterName });
  if (!semester) {
    return res.status(404).json({
      status: 404,
      message: "Semester not found",
    });
  }

  const teacher = await Teacher.findOne({ fullName: teacherName  });
  if (!teacher) {
    return res.status(404).json({
      status: 404,
      message: "Teacher not found",
    });
  }

  const duplicateQuestion = await Question.findOne({
    _id: { $ne: id },
    questionText,
    subjectId: subject._id,
    gradeId: grade._id,
    semesterId: semester._id,
    teacherId: teacher._id,
  });

  if (duplicateQuestion) {
    return res.status(400).json({
      status: 400,
      message: "Question with the same text and details already exists",
    });
  }

  const updatedQuestion = await Question.findByIdAndUpdate(
    id,
    {
      questionType,
      questionText,
      subjectId: subject._id,
      gradeId: grade._id,
      semesterId: semester._id,
      teacherId: teacher._id,
      answer,
    },
    { new: true }
  );

  res.status(200).json({
    status: 200,
    message: "Question updated successfully",
    updatedQuestion,
  });
});

const deleteQuestion = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!validateObjectId(id)) {
    return res.status(400).json({
      status: 400,
      message: "Invalid Question ID",
    });
  }

  const existingQuestion = await Question.findById(id);
  if (!existingQuestion) {
    return res.status(404).json({
      status: 404,
      message: "Question not found",
    });
  }

  await Question.findByIdAndDelete(id);

  res.status(200).json({
    status: 200,
    message: "Question deleted successfully",
  });
});

const getQuestion = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!validateObjectId(id)) {
    return res.status(400).json({
      status: 400,
      message: "Invalid Question ID",
    });
  }

  const question = await Question.findById(id)
    .populate("subjectId", "subjectName")
    .populate("gradeId", "gradeName")
    .populate("semesterId", "semesterName")
    .populate("teacherId", "fullName");

  if (!question) {
    return res.status(404).json({
      status: 404,
      message: "Question not found",
    });
  }

  res.status(200).json({
    status: 200,
    message: "Question retrieved successfully",
    question,
  });
});

const getAllQuestions = expressAsyncHandler(async (req, res) => {
  const questions = await Question.find()
    .populate("subjectId", "subjectName")
    .populate("gradeId", "gradeName")
    .populate("semesterId", "semesterName")
    .populate("teacherId", "fullName");

  res.status(200).json({
    status: 200,
    message: "Questions retrieved successfully",
    questions,
  });
});

module.exports = {
  createQuestion,
  updateQuestion,
  deleteQuestion,
  getQuestion,
  getAllQuestions,
};