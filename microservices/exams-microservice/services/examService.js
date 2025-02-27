const Exam = require("../models/Exam");

const addExam = async (examData) => {
  const exam = new Exam(examData);
  await exam.save();
  return exam;
};
const fetchExams = async () => {
  const exams = await Exam.find()
    .populate(
      "subject_id grade_id class_id academic_year_id semester_id created_by"
    )
    .select("-__v -createdAt -updatedAt");
  return exams;
};
const fetchExamById = async (id) => {
  const exam = await Exam.findById(id)
    .populate(
      "subject_id grade_id class_id academic_year_id semester_id created_by"
    )
    .select("-__v -createdAt -updatedAt");
  return exam;
};
module.exports = { addExam, fetchExams, fetchExamById };
