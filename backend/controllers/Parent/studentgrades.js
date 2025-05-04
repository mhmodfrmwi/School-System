// controllers/studentGradeController.js
const expressAsyncHandler = require("express-async-handler");
const studentGradeService = require("../../services/studentGradeService");

/**
 * Controller for fetching grades for a specific student in a specific subject
 * @route GET /api/grades/:subjectId
 * @access Private
 */
const getStudentGrades = expressAsyncHandler(async (req, res) => {
  const { subjectId } = req.params;
  const { studentId } = req.body;

  try {
    const grades = await studentGradeService.getStudentSubjectGrades(
      studentId,
      subjectId
    );
    res.status(200).json(grades);
  } catch (error) {
    console.error("Error fetching student grades:", error);
    res.status(error.message.includes("not found") ? 404 : 500).json({
      message: error.message || "Error fetching student grades.",
    });
  }
});

/**
 * Controller for fetching current semester grades for a student
 * @route GET /api/grades/semester/current
 * @access Private
 */
const getStudentSemesterGrades = expressAsyncHandler(async (req, res) => {
  const { studentId } = req.body;

  try {
    const grades = await studentGradeService.getStudentCurrentSemesterGrades(
      studentId
    );
    res.status(200).json(grades);
  } catch (error) {
    console.error("Error fetching student semester grades:", error);
    res.status(error.message.includes("not found") ? 404 : 500).json({
      message: error.message || "Error fetching student semester grades.",
    });
  }
});

/**
 * Controller for fetching all semester grades for a student
 * @route GET /api/grades/semester/all
 * @access Private
 */
const getAllSemesterGrades = expressAsyncHandler(async (req, res) => {
  const { studentId } = req.body;

  try {
    const grades = await studentGradeService.getAllSemestersGrades(studentId);
    res.status(200).json(grades);
  } catch (error) {
    console.error("Error fetching all semester grades:", error);
    res.status(error.message.includes("not found") ? 404 : 500).json({
      message: error.message || "Error fetching all semester grades.",
    });
  }
});

/**
 * Controller for fetching a comprehensive grades report for a student
 * @route GET /api/grades/report
 * @access Private
 */
const getStudentGradesReport = expressAsyncHandler(async (req, res) => {
  const { studentId } = req.body;

  try {
    const gradesReport = await studentGradeService.getStudentGradesReport(
      studentId
    );
    res.status(200).json(gradesReport);
  } catch (error) {
    console.error("Error fetching student grades report:", error);
    res.status(error.message.includes("not found") ? 404 : 500).json({
      message: error.message || "Error fetching student grades report.",
    });
  }
});

module.exports = {
  getStudentGrades,
  getStudentSemesterGrades,
  getAllSemesterGrades,
  getStudentGradesReport,
};
