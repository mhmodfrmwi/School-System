const expressAsyncHandler = require("express-async-handler");
const validateObjectId = require("../../utils/validateObjectId");
const Student = require("../../DB/StudentModel");
const GradeSubjectSemester = require("../../DB/GradeSubjectSemesterModel");
const GradeSubject = require("../../DB/GradeSubjectModel");
const Question = require("../../DB/questionBankModel");
const BookMarkForQuestion = require("../../DB/BookMarkForQuestionModel");
const QuestionView = require("../../DB/QuestionViewModel");
const student = require("../../DB/StudentModel");
const AcademicYear = require("../../DB/academicYearModel");
const Semester = require("../../DB/semesterModel");

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

      const gradeSubjectSemester = await GradeSubjectSemester.findById(
        gradeSubjectSemesterId
      )
        .populate({
          path: "grade_subject_id",
          populate: [
            { path: "subjectId" },
            { path: "gradeId" },
            { path: "academicYear_id" },
          ],
        })
        .populate("semester_id");

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
        subjectId: gradeSubjectSemester.grade_subject_id.subjectId,
        gradeId: gradeSubjectSemester.grade_subject_id.gradeId,
        semesterId: gradeSubjectSemester.semester_id,
      })
        .populate("subjectId", "subjectName")
        .populate("gradeId", "gradeName")
        .populate("semesterId", "semesterName")
        .populate("teacherId", "fullName");

      const questionsWithStatus = await Promise.all(
        questions.map(async (question) => {
          const [isBookmarked, isViewed] = await Promise.all([
            BookMarkForQuestion.findOne({
              student_id: studentId,
              question_id: question._id,
            }),
            QuestionView.findOne({
              student_id: studentId,
              question_id: question._id,
            }),
          ]);

          return {
            ...question.toObject(),
            isBookmarked: !!isBookmarked,
            isViewed: !!isViewed,
          };
        })
      );

      res.status(200).json({
        status: 200,
        message: "Questions retrieved successfully.",
        questions: questionsWithStatus,
      });
    } catch (error) {
      console.error("Error fetching questions:", error);
      res.status(500).json({
        status: 500,
        message: "Failed to retrieve questions.",
        error: error.message,
      });
    }
  }
);
const getAllQuestionsForAllSubjects = async (req, res) => {
  console.log("Fetching all questions for all subjects...");
  try {
    const studentId = req.user.id;
    const studentData = await student.findById(studentId).populate("gradeId");
    const gradeId = studentData.gradeId._id;
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();
    let startYear, endYear;
    if (currentMonth >= 2 && currentMonth <= 7) {
      startYear = currentYear - 1;
      endYear = currentYear;
    } else {
      startYear = currentYear;
      endYear = currentYear + 1;
    }
    const academicYear = await AcademicYear.findOne({
      startYear: startYear,
      endYear: endYear,
    });
    if (!academicYear) {
      return res.status(404).json({
        status: 404,
        message: "Academic year not found.",
      });
    }
    const currentSemesterName =
      currentMonth >= 2 && currentMonth <= 7 ? "Semester 2" : "Semester 1";
    const currentSemester = await Semester.findOne({
      semesterName: currentSemesterName,
      academicYear_id: academicYear._id,
    });
    if (!currentSemester) {
      return res.status(404).json({
        status: 404,
        message: "Current semester not found.",
      });
    }
    const questions = await Question.find({
      gradeId: gradeId,
      semesterId: currentSemester._id,
    })
      .populate("subjectId", "subjectName")
      .populate("gradeId", "gradeName")
      .populate("semesterId", "semesterName")
      .populate("teacherId", "fullName");
    res.status(200).json({
      status: 200,
      message: "Questions retrieved successfully.",
      questions,
    });
  } catch (error) {
    console.error("Error fetching questions:", error);
    res.status(500).json({
      status: 500,
      message: "Failed to retrieve questions.",
      error: error.message,
    });
  }
};
module.exports = {
  getQuestionsBySubjectForStudent,
  getAllQuestionsForAllSubjects,
};
