const expressAsyncHandler = require("express-async-handler");
const validateObjectId = require("../../utils/validateObjectId");
const questionService = require("../../services/questionBankService");
const studentService = require("../../services/studentService");
const academicService = require("../../services/academicYearService");
const getQuestionsBySubjectForStudent = expressAsyncHandler(
  async (req, res) => {
    try {
      const studentId = req.user.id;
      const gradeSubjectSemesterId = req.params.gradeSubjectSemesterId;

      if (
        !validateObjectId(studentId) ||
        !validateObjectId(gradeSubjectSemesterId)
      ) {
        return res.status(400).json({
          status: 400,
          message: "Invalid student ID or gradeSubjectSemester ID.",
        });
      }

      const questions = await questionService.getQuestionsBySubjectForStudent(
        studentId,
        gradeSubjectSemesterId
      );

      res.status(200).json({
        status: 200,
        message: "Questions retrieved successfully.",
        questions,
      });
    } catch (error) {
      console.error("Error fetching questions:", error);
      const statusCode = error.statusCode || 500;
      res.status(statusCode).json({
        status: statusCode,
        message: error.message || "Failed to retrieve questions.",
        error: error.message,
      });
    }
  }
);

const getAllQuestionsForAllSubjects = expressAsyncHandler(async (req, res) => {
  try {
    const studentId = req.user.id;

    const gradeId = await studentService.getStudentGradeId(studentId);
    const academicYear = await academicService.getCurrentAcademicYear();
    const currentSemester = await academicService.getCurrentSemester(
      academicYear._id
    );

    const questions = await questionService.getQuestionsByGradeAndSemester(
      gradeId,
      currentSemester._id
    );

    res.status(200).json({
      status: 200,
      message: "Questions retrieved successfully.",
      questions,
    });
  } catch (error) {
    console.error("Error fetching questions:", error);
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({
      status: statusCode,
      message: error.message || "Failed to retrieve questions.",
      error: error.message,
    });
  }
});
const getAllQuestionsForAllSubjectsWithStatus = expressAsyncHandler(
  async (req, res) => {
    try {
      const studentId = req.user.id;

      const gradeId = await studentService.getStudentGradeId(studentId);
      const academicYear = await academicService.getCurrentAcademicYear();
      const currentSemester = await academicService.getCurrentSemester(
        academicYear._id
      );

      const questions =
        await questionService.getQuestionsByGradeAndSemesterWithStatus(
          gradeId,
          currentSemester._id,
          studentId
        );

      res.status(200).json({
        status: 200,
        message: "Questions retrieved successfully.",
        questions,
      });
    } catch (error) {
      console.error("Error fetching questions:", error);
      const statusCode = error.statusCode || 500;
      res.status(statusCode).json({
        status: statusCode,
        message: error.message || "Failed to retrieve questions.",
        error: error.message,
      });
    }
  }
);
module.exports = {
  getQuestionsBySubjectForStudent,
  getAllQuestionsForAllSubjects,
  getAllQuestionsForAllSubjectsWithStatus,
};
