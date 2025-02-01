const expressAsyncHandler = require("express-async-handler");
const validateObjectId = require("../../utils/validateObjectId");
const Student = require("../../DB/student");
const GradeSubjectSemester = require("../../DB/gradeSubjectSemester");
const GradeSubject = require("../../DB/gradeSubject"); // Import the GradeSubject model
const Question = require("../../DB/questionBankModel");

const getQuestionsBySubjectForStudent = expressAsyncHandler(async (req, res) => {
  const studentId = req.user.id;
  const gradeSubjectSemesterId = req.params.gradeSubjectSemesterId; // Get the ID from request parameters

  // Validate ObjectIds
  if (!validateObjectId(studentId) || !validateObjectId(gradeSubjectSemesterId)) {
    return res.status(400).json({
      status: 400,
      message: "Invalid student ID or gradeSubjectSemester ID.",
    });
  }

  try {
    // Fetch the student's gradeId
    const student = await Student.findById(studentId).select("gradeId");
    if (!student) {
      return res.status(404).json({
        status: 404,
        message: "Student not found.",
      });
    }

    // Fetch the GradeSubjectSemester document
    const gradeSubjectSemester = await GradeSubjectSemester.findById(gradeSubjectSemesterId);
    if (!gradeSubjectSemester) {
      return res.status(404).json({
        status: 404,
        message: "GradeSubjectSemester not found.",
      });
    }

    // Fetch the GradeSubject document using grade_subject_id from GradeSubjectSemester
    const gradeSubject = await GradeSubject.findById(gradeSubjectSemester.grade_subject_id);
    if (!gradeSubject) {
      return res.status(404).json({
        status: 404,
        message: "GradeSubject not found.",
      });
    }

    // Fetch questions based on subjectId, gradeId, and semesterId
    const questions = await Question.find({
      subjectId: gradeSubject.subjectId, // Use subjectId from GradeSubject
      gradeId: student.gradeId, // Use gradeId from the student
      semesterId: gradeSubjectSemester.semester_id, // Use semesterId from GradeSubjectSemester
    })
      .populate("subjectId", "subjectName")
      .populate("gradeId", "gradeName")
      .populate("semesterId", "semesterName")
      .populate("teacherId", "fullName");

    if (questions.length === 0) {
      return res.status(404).json({
        status: 404,
        message: "No questions found for the specified subject, grade, and semester.",
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
});

module.exports = {
  getQuestionsBySubjectForStudent,
};


/*const expressAsyncHandler = require("express-async-handler");
const validateObjectId = require("../../utils/validateObjectId");
const Student = require("../../DB/student");
const Subject = require("../../DB/subjectModel");
const Question = require("../../DB/questionBankModel");

const getQuestionsBySubjectForStudent = expressAsyncHandler(async (req, res) => {
  const studentId = req.user.id;
  const subjectName = req.body.subject;
  
  if (!validateObjectId(studentId)) {
    return res.status(400).json({
      status: 400,
      message: "Invalid student ID.",
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

    const subject = await Subject.findOne({ subjectName });
    if (!subject) {
      return res.status(404).json({
        status: 404,
        message: "Subject not found.",
      });
    }

    const questions = await Question.find({
      subjectId: subject._id,
      gradeId: student.gradeId,
    })
      .populate("subjectId", "subjectName")
      .populate("gradeId", "gradeName")
      .populate("semesterId", "semesterName")
      .populate("teacherId", "fullName");

    if (questions.length === 0) {
      return res.status(404).json({
        status: 404,
        message: "No questions found for the specified subject and grade.",
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
});

module.exports = {
  getQuestionsBySubjectForStudent,
};*/