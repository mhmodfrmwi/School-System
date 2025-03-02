const Exam = require("../models/Exam");
const Session = require("../models/Session");
const StudentAnswer = require("../models/StudentAnswer");
const ExamResult = require("../models/ExamResult");
const calculateResults = async (session_id) => {
  try {
    const answers = await StudentAnswer.find({ session_id });
    const totalMarks = answers.reduce(
      (sum, answer) => sum + (answer.marks_awarded || 0),
      0
    );

    const session = await Session.findById(session_id);
    const exam = await Exam.findById(session.exam_id);
    const percentage = (totalMarks / exam.total_marks) * 100;

    const result = new ExamResult({
      student_id: session.student_id,
      exam_id: session.exam_id,
      total_marks: totalMarks,
      percentage,
      status: totalMarks >= exam.total_marks / 2 ? "Pass" : "Fail",
    });

    await result.save();
    return result;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
};

const getExamResultsByExamId = async (id) => {
  try {
    const results = await ExamResult.find({ exam_id: id })
      .populate("student_id", "fullName")
      .populate("exam_id", "title")
      .select("-__v");
    return results;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
};
module.exports = {
  calculateResults,
  getExamResultsByExamId,
};
