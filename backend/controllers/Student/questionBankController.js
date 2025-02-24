const expressAsyncHandler = require("express-async-handler");
const validateObjectId = require("../../utils/validateObjectId");
const Student = require("../../DB/student");
const GradeSubjectSemester = require("../../DB/gradeSubjectSemester");
const GradeSubject = require("../../DB/gradeSubject");
const Question = require("../../DB/questionBankModel");

const getQuestionsBySubjectForStudent = expressAsyncHandler(
  async (req, res) => {
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

    try {
      const student = await Student.findById(studentId).select("gradeId");
      if (!student) {
        return res.status(404).json({
          status: 404,
          message: "Student not found.",
        });
      }

      const gradeSubjectSemester = await GradeSubjectSemester.findById(
        gradeSubjectSemesterId
      )
      .populate({
        path: "grade_subject_id",
        populate: [
          { path: "subjectId"  },
          { path: "academicYear_id" },
          { path: "gradeId" },
        ],
      })
      .populate({
        path: "semester_id",
        populate: { path: "academicYear_id" },
      });
      
      if (!gradeSubjectSemester) {
        return res.status(404).json({
          status: 404,
          message: "GradeSubjectSemester not found.",
        });
      }

      const gradeSubject = await GradeSubject.findById(
        gradeSubjectSemester.grade_subject_id
      );
      if (!gradeSubject) {
        return res.status(404).json({
          status: 404,
          message: "GradeSubject not found.",
        });
      }
      const questions = await Question.find({
        subjectId: gradeSubject.subjectId,
        gradeId: student.gradeId,
        semesterId: gradeSubjectSemester.semester_id,
      })
        .populate("subjectId", "subjectName")
        .populate("gradeId", "gradeName")
        .populate("semesterId", "semesterName")
        .populate("teacherId", "fullName");

      if (questions.length === 0) {
        return res.status(404).json({
          status: 404,
          message:
            "No questions found for the specified subject, grade, and semester.",
        });
      }

      res.status(200).json({
        status: 200,
        message: "Questions retrieved successfully.",
        questions,
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: "Failed to retrieve questions.",
        error: error.message,
      });
    }
  }
);

module.exports = {
  getQuestionsBySubjectForStudent,
};
