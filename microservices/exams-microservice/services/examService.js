const Exam = require("../models/Exam");

const addExam = async (examData) => {
  try {
    console.log(examData);
    const exam = new Exam(examData);
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
      .populate("subject_id grade_id class_id academic_year_id semester_id")
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
        "subject_id grade_id class_id academic_year_id semester_id created_by"
      )
      .select("-__v -createdAt -updatedAt");
    return exam;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
};
module.exports = { addExam, fetchExams, fetchExamById, fetchExamsByAttributes };
