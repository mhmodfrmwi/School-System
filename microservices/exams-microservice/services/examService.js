const Exam = require("../models/Exam");
const { createExamQuestions } = require("./questionService");

const addExam = async (examData) => {
  try {
    const questionIds = await createExamQuestions(examData.exam_questions);
    const exam = new Exam({
      ...examData,
      exam_questions: questionIds,
    });
    await exam.save();
    return exam;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
};

const fetchExams = async () => {
  try {
    const exams = await Exam.find()
      .populate("subject_id grade_id class_id academic_year_id semester_id")
      .populate("created_by", "_id fullName")
      .select("-__v -createdAt -updatedAt");
    return exams;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
};

const fetchExamsByAttributes = async (
  class_id,
  semester_id,
  grade_id,
  subject_id,
  academic_year_id
) => {
  try {
    const exams = await Exam.find({
      class_id,
      semester_id,
      grade_id,
      subject_id,
      academic_year_id,
    })
      .populate(
        "subject_id grade_id class_id academic_year_id semester_id exam_questions"
      )
      .populate("created_by", "_id fullName")
      .select("-__v -createdAt -updatedAt");
    return exams;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
};

const fetchExamById = async (id) => {
  try {
    const exam = await Exam.findById(id)
      .populate(
        "subject_id grade_id class_id academic_year_id semester_id created_by exam_questions"
      )
      .select("-__v -createdAt -updatedAt");
    return exam;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
};

const checkExamStatus = async (id) => {
  try {
    const exam = await Exam.findById(id);
    return exam.exam_status;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
};

const updateExam = async (id, updateData) => {
  try {
    const exam = await Exam.findByIdAndUpdate(id, updateData, { new: true });
    return exam;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
};

const deleteExam = async (id) => {
  try {
    const exam = await Exam.findByIdAndDelete(id);
    return exam;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
};

module.exports = {
  addExam,
  fetchExams,
  fetchExamById,
  fetchExamsByAttributes,
  checkExamStatus,
  updateExam,
  deleteExam,
};
