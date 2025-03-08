const Exam = require("../models/Exam");
const Session = require("../models/Session");
const StudentAnswer = require("../models/StudentAnswer");
const ExamResult = require("../models/ExamResult");
const calculateResults = async (session_id) => {
  try {
    const session = await Session.findById(session_id);
    if (!session) {
      throw new Error(`Session with id ${session_id} not found`);
    }

    const exam = await Exam.findById(session.exam_id);
    if (!exam) {
      throw new Error(`Exam with id ${session.exam_id} not found`);
    }

    if (!exam.total_marks || exam.total_marks <= 0) {
      throw new Error("Exam has invalid total marks");
    }

    const answers = await StudentAnswer.find({ session_id });
    if (!answers || answers.length === 0) {
      throw new Error(`No answers found for session ${session_id}`);
    }

    const totalMarks = answers.reduce(
      (sum, answer) => sum + (answer.marks_awarded || 0),
      0
    );

    const percentage =
      exam.total_marks > 0 ? (totalMarks / exam.total_marks) * 100 : 0;

    const existingResult = await ExamResult.findOne({
      student_id: session.student_id,
      exam_id: session.exam_id,
    });

    if (existingResult) {
      return existingResult;
    }

    const result = new ExamResult({
      student_id: session.student_id,
      exam_id: session.exam_id,
      total_marks: totalMarks,
      percentage: parseFloat(percentage.toFixed(2)),
      status: totalMarks >= exam.total_marks / 2 ? "Pass" : "Fail",
    });

    await result.save();
    return result;
  } catch (error) {
    console.error("Error calculating results:", error);
    throw new Error(`Failed to calculate results: ${error.message}`);
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
