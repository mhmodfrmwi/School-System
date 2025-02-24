const expressAsyncHandler = require("express-async-handler");
const validateObjectId = require("../../utils/validateObjectId");
const questionValidationSchema = require("../../validations/questionBankValidation");
const Question = require("../../DB/questionBankModel");
const Subject = require("../../DB/subjectModel");
const Grade = require("../../DB/gradeModel");
const Semester = require("../../DB/semesterModel");
const Teacher = require("../../DB/teacher");
const GradeSubjectSemester = require("../../DB/gradeSubjectSemester");

const createQuestion = expressAsyncHandler(async (req, res) => {
  const teacherId = req.user.id;

  if (!validateObjectId(teacherId)) {
    return res.status(400).json({
    status: 400,
    message: "Invalid teacher ID.",
    });
  }

  const { error } = questionValidationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      status: 400,
      message: error.details[0].message,
    });
  }

  const { questionType, questionText, answer, choices } = req.body;

  const { gradeSubjectSemesterId } = req.params;

  if (!validateObjectId(gradeSubjectSemesterId)) {
    return res.status(400).json({
      status: 400,
      message: "Invalid gradeSubjectSemesterId",
    });
  }

  const gradeSubjectSemester = await GradeSubjectSemester.findById(gradeSubjectSemesterId)
    .populate("grade_subject_id");

  if (!gradeSubjectSemester) {
    return res.status(404).json({
      status: 404,
      message: "GradeSubjectSemester not found",
    });
  }

  const subjectId = gradeSubjectSemester.grade_subject_id.subjectId;
  const gradeId = gradeSubjectSemester.grade_subject_id.gradeId;
  const semesterId = gradeSubjectSemester.semester_id;

  const existingQuestion = await Question.findOne({
    questionText,
    subjectId,
    gradeId,
    semesterId,
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
    subjectId,
    gradeId,
    semesterId,
    teacherId,
    answer,
    choices: questionType === "MCQ" ? choices : undefined,
  });

  await newQuestion.save();

  res.status(201).json({
    status: 201,
    message: "Question created successfully",
    newQuestion,
  });
});

const updateQuestion = expressAsyncHandler(async (req, res) => {
  const { questionId } = req.params;
  const teacherId = req.user.id;

  if (!validateObjectId(questionId)) {
    return res.status(400).json({
      status: 400,
      message: "Invalid question ID",
    });
  }
  if (!validateObjectId(teacherId)) {
    return res.status(400).json({
    status: 400,
    message: "Invalid teacher ID.",
    });
  }

  const { error } = questionValidationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      status: 400,
      message: error.details[0].message,
    });
  }

  const { questionType, questionText, answer, choices } = req.body;

  const existingQuestion = await Question.findById(questionId);

  if (!existingQuestion) {
    return res.status(404).json({
      status: 404,
      message: "Question not found",
    });
  }

  if (existingQuestion.teacherId.toString() !== teacherId.toString()) {
    return res.status(403).json({
      status: 403,
      message: "You are not authorized to update this question",
    });
  }

  const duplicateQuestion = await Question.findOne({
    questionText,
    subjectId: existingQuestion.subjectId,
    gradeId: existingQuestion.gradeId,
    semesterId: existingQuestion.semesterId,
    _id: { $ne: questionId },
  });

  if (duplicateQuestion) {
    return res.status(400).json({
      status: 400,
      message: "Question with the same text and details already exists",
    });
  }

  existingQuestion.questionType = questionType;
  existingQuestion.questionText = questionText;
  existingQuestion.answer = answer;

  if (questionType === "MCQ") {
    existingQuestion.choices = choices;
  } else {
    existingQuestion.choices = undefined;
  }

  await existingQuestion.save();

  res.status(200).json({
    status: 200,
    message: "Question updated successfully",
    updatedQuestion: existingQuestion,
  });
});

const deleteQuestion = expressAsyncHandler(async (req, res) => {
  const { questionId } = req.params;
  const teacherId = req.user.id;

  if (!validateObjectId(questionId)) {
    return res.status(400).json({
      status: 400,
      message: "Invalid question ID",
    });
  }
  if (!validateObjectId(teacherId)) {
    return res.status(400).json({
    status: 400,
    message: "Invalid teacher ID.",
    });
  }

  const existingQuestion = await Question.findById(questionId);

  if (!existingQuestion) {
    return res.status(404).json({
      status: 404,
      message: "Question not found",
    });
  }

  if (existingQuestion.teacherId.toString() !== teacherId.toString()) {
    return res.status(403).json({
      status: 403,
      message: "You are not authorized to delete this question",
    });
  }

  await Question.deleteOne({ _id: questionId });

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

const getTeacherQuestions = expressAsyncHandler(async (req, res) => {
  const teacherId = req.user.id;

  if (!validateObjectId(teacherId)) {
    return res.status(400).json({
    status: 400,
    message: "Invalid teacher ID.",
    });
  }

  const { gradeSubjectSemesterId } = req.params;

  if (!validateObjectId(gradeSubjectSemesterId)) {
    return res.status(400).json({
      status: 400,
      message: "Invalid gradeSubjectSemesterId",
    });
  }

  const gradeSubjectSemester = await GradeSubjectSemester.findById(gradeSubjectSemesterId)
    .populate("grade_subject_id");

  if (!gradeSubjectSemester) {
    return res.status(404).json({
      status: 404,
      message: "GradeSubjectSemester not found",
    });
  }

  const subjectId = gradeSubjectSemester.grade_subject_id.subjectId;
  const gradeId = gradeSubjectSemester.grade_subject_id.gradeId;
  const semesterId = gradeSubjectSemester.semester_id;

  const questions = await Question.find({
    teacherId,
    subjectId,
    gradeId,
    semesterId,
  })
  .populate("subjectId", "subjectName")
  .populate("gradeId", "gradeName")
  .populate("semesterId", "semesterName")
  .populate("teacherId", "fullName");;

  res.status(200).json({
    status: 200,
    message: "Questions fetched successfully",
    questions,
  });
});

const getSubjestSemesterQuestions = expressAsyncHandler(async (req, res) => {
  const { gradeSubjectSemesterId } = req.params;

  if (!validateObjectId(gradeSubjectSemesterId)) {
    return res.status(400).json({
      status: 400,
      message: "Invalid gradeSubjectSemesterId",
    });
  }

  const gradeSubjectSemester = await GradeSubjectSemester.findById(gradeSubjectSemesterId)
    .populate("grade_subject_id");

  if (!gradeSubjectSemester) {
    return res.status(404).json({
      status: 404,
      message: "GradeSubjectSemester not found",
    });
  }

  const subjectId = gradeSubjectSemester.grade_subject_id.subjectId;
  const gradeId = gradeSubjectSemester.grade_subject_id.gradeId;
  const semesterId = gradeSubjectSemester.semester_id;

  const questions = await Question.find({
    subjectId,
    gradeId,
    semesterId,
  })
  .populate("subjectId", "subjectName")
  .populate("gradeId", "gradeName")
  .populate("semesterId", "semesterName")
  .populate("teacherId", "fullName");;

  res.status(200).json({
    status: 200,
    message: "Questions fetched successfully",
    questions,
  });
});

module.exports = {
  createQuestion,
  updateQuestion,
  deleteQuestion,
  getQuestion,
  getTeacherQuestions,
  getSubjestSemesterQuestions
};