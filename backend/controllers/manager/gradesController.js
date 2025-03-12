const expressAsyncHandler = require("express-async-handler");
const validateObjectId = require("../../utils/validateObjectId");
const moment = require("moment");
const Student = require("../../DB/student");
const Score = require("../../DB/scoreModel");
const SubjectScore = require("../../DB/subjectScoreModel");
const AcademicYear = require("../../DB/academicYearModel");
const Grade = require("../../DB/gradeModel");
const Class = require("../../DB/classModel");
const Subject = require("../../DB/subjectModel");
const Semester = require("../../DB/semesterModel")

const getExamResults = expressAsyncHandler(async (req, res) => {
    const { gradeName, className, subjectName } = req.body;
  
    try {
      const grade = await Grade.findOne({ gradeName });
      if (!grade) {
        return res.status(404).json({
          status: 404,
          message: "Grade not found",
        });
      }
      const gradeId = grade._id;

      const classObj = await Class.findOne({ className });
      if (!classObj) {
        return res.status(404).json({
          status: 404,
          message: "Class not found",
        });
      }
      const classId = classObj._id;

      const subject = await Subject.findOne({ subjectName });
      if (!subject) {
        return res.status(404).json({
          status: 404,
          message: "Subject not found",
        });
      }
      const subjectId = subject._id;

      const currentYear = moment().year().toString().slice(-2);
      const currentMonth = moment().month() + 1;
      let startYear, endYear;
      if (currentMonth >= 9 && currentMonth <= 12) {
        startYear = "20" + parseInt(currentYear);
        endYear = "20" + (parseInt(currentYear) + 1);
      } else {
        startYear = "20" + (parseInt(currentYear) - 1);
        endYear = "20" + parseInt(currentYear);
      }
  
      let semesterName;
      if (currentMonth >= 9 && currentMonth <= 12) {
        semesterName = "Semester 1";
      } else {
        semesterName = "Semester 2";
      }

      const academicYear = await AcademicYear.findOne({ startYear, endYear });
      if (!academicYear) {
        return res.status(404).json({
          status: 404,
          message: "Academic year not found",
        });
      }
      const academicYearId = academicYear._id;

      const semester = await Semester.findOne({
        semesterName,
        academicYear_id: academicYearId,
      });
      if (!semester) {
        return res.status(404).json({
          status: 404,
          message: "Semester not found in the given academic year",
        });
      }
      const semesterId = semester._id;

      const subjectScores = await SubjectScore.find({
        gradeId,
        subjectId,
        semesterId,
        type: { $in: ["midterm", "final"] },
      })
        .populate({
          path: "gradeId",
          select: "gradeName level",
        })
        .populate({
          path: "subjectId",
          select: "subjectName subjectCode",
        })
        .populate({
          path: "semesterId",
          select: "semesterName",
        })
        .lean();
  
      if (!subjectScores.length) {
        return res.status(404).json({
          status: 404,
          message: "No SubjectScore found for the given criteria",
        });
      }

      const students = await Student.find({ classId }).lean();

      const scores = await Score.find({
        subjectScoreId: { $in: subjectScores.map((ss) => ss._id) },
        classId,
      })
        .populate({
          path: "studentId",
          select: "academic_number fullName",
        })
        .populate({
          path: "teacherId",
          select: "fullName",
        })
        .lean();
  
      if (!scores.length) {
        return res.status(404).json({
          status: 404,
          message: "No exam results found for this class",
        });
      }

      const studentResults = {};
  
      scores.forEach((score) => {
        const studentId = score.studentId._id.toString();
        if (!studentResults[studentId]) {
          studentResults[studentId] = {
            academic_number: score.studentId.academic_number,
            fullName: score.studentId.fullName,
            midterm: null,
            final: null,
            total: null,
            midtermFinalDegree: null,
            finalFinalDegree: null,
            totalFinalDegree: null,
          };
        }
  
        const subjectScore = subjectScores.find((ss) =>
          ss._id.equals(score.subjectScoreId)
        );
  
        if (subjectScore.type === "midterm") {
          studentResults[studentId].midterm = score.examGrade;
          studentResults[studentId].midtermFinalDegree = subjectScore.finalDegree;
        } else if (subjectScore.type === "final") {
          studentResults[studentId].final = score.examGrade;
          studentResults[studentId].finalFinalDegree = subjectScore.finalDegree;
        }
      });

      for (const studentId in studentResults) {
        const { midterm, final, midtermFinalDegree, finalFinalDegree } =
          studentResults[studentId];

        studentResults[studentId].total =
          midterm !== null && final !== null ? midterm + final : null;

        studentResults[studentId].totalFinalDegree =
          midtermFinalDegree !== null && finalFinalDegree !== null
            ? midtermFinalDegree + finalFinalDegree
            : null;
      }

      const response = {
        grade: {
          gradeName: subjectScores[0].gradeId.gradeName,
          level: subjectScores[0].gradeId.level,
        },
        subject: {
          subjectName: subjectScores[0].subjectId.subjectName,
          subjectCode: subjectScores[0].subjectId.subjectCode,
        },
        semester: {
          semesterName: subjectScores[0].semesterId.semesterName,
        },
        teacher: {
          fullName: scores[0].teacherId.fullName,
        },
        students: Object.values(studentResults),
      };
  
      return res.status(200).json({
        status: 200,
        message: "Exam results retrieved successfully",
        data: response,
      });
    } catch (error) {
      console.error("Error retrieving exam results:", error);
      return res.status(500).json({
        status: 500,
        message: "Error retrieving exam results",
        error: error.message,
      });
    }
});

module.exports = {
    getExamResults
};