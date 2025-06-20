const { request } = require("express");
const GradeSubject = require("../models/GradeSubject");
const Student = require("../models/Student");
const GradeSubjectSemester = require("../models/GradeSubjectSemester");

const Exam = require('../models/Exam');
const Session = require('../models/Session');
const ExamResult = require('../models/ExamResult');

const {
  getStudentResults,
  getMissedExams,
  getCompletedExams,
  getCompletedExamsForAllSubjects,
} = require("../services/examService");

const getAllStudentResults = async (req, res) => {
  try {
    const {student_id} = req.params;
    const exams = await getStudentResults(student_id);//
    res.status(200).json(exams);
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Failed to get all student results",
      error: error.message,
    });
  }
};

const getMissedExamsForStudent = async (req, res) => {
  try {
    const {student_id} = req.params;
    const student = await Student.findById(student_id)

    const grade_subject_semester_id = req.params.gradeSubjectSemesterId;
    const class_id = student.classId;
    const gradeSubjectSemester = await GradeSubjectSemester.findOne({
      _id: grade_subject_semester_id,
    }).populate([
      {
        path: "grade_subject_id",
        populate: { path: "subjectId", path: "gradeId" },
      },
      { path: "semester_id", populate: { path: "academicYear_id" } },
    ]);

    if (!gradeSubjectSemester) {
      return res
        .status(404)
        .json({ message: "GradeSubjectSemester not found" });
    }
    const subject_id = gradeSubjectSemester.grade_subject_id.subjectId;
    const grade_id = gradeSubjectSemester.grade_subject_id.gradeId._id;
    const academic_year_id =
      gradeSubjectSemester.grade_subject_id.academicYear_id;
    const semester_id = gradeSubjectSemester.semester_id._id;

    const exams = await getMissedExams(
      student_id,
      subject_id,
      grade_id,
      academic_year_id,
      semester_id,
      class_id
    );
    res.status(200).json(exams);
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Failed to get missed exams for student",
      error: error.message,
    });
  }
};

const getCompletedExamsForStudent = async (req, res) => {
  try {
    const {student_id} = req.params;
    const student = await Student.findById(student_id)

    const grade_subject_semester_id = req.params.gradeSubjectSemesterId;
    const class_id = student.classId;
    const gradeSubjectSemester = await GradeSubjectSemester.findOne({
      _id: grade_subject_semester_id,
    }).populate([
      {
        path: "grade_subject_id",
        populate: { path: "subjectId", path: "gradeId" },
      },
      { path: "semester_id", populate: { path: "academicYear_id" } },
    ]);

    if (!gradeSubjectSemester) {
      return res
        .status(404)
        .json({ message: "GradeSubjectSemester not found" });
    }
    const subject_id = gradeSubjectSemester.grade_subject_id.subjectId;
    const grade_id = gradeSubjectSemester.grade_subject_id.gradeId._id;
    const academic_year_id =
      gradeSubjectSemester.grade_subject_id.academicYear_id;
    const semester_id = gradeSubjectSemester.semester_id._id;

    const exams = await getCompletedExams(
      student_id,
      subject_id,
      grade_id,
      academic_year_id,
      semester_id,
      class_id
    );
    res.status(200).json(exams);
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Failed to get completed exams for student",
      error: error.message,
    });
  }
};
const getCompletedExamsForSubjects = async (req, res) => {
  try {
    const {student_id} = req.params;
    const exams = await getCompletedExamsForAllSubjects(student_id);
    res.status(200).json(exams);
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Failed to get completed exams for student ForSubjects",
      error: error.message,
    });
  }
};

const getAllExamsForStudent = async (req, res) => {
  try {
    const { student_id } = req.params;
    
    // 1. Get student and their class info
    const student = await Student.findById(student_id).populate('classId');
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // 2. Get all subjects for the student's class
    const gradeSubjectSemesters = await GradeSubjectSemester.find({
      grade_id: student.classId.gradeId,
      academic_year_id: student.classId.academicYearId
    }).populate([
      {
        path: "grade_subject_id",
        populate: [{ path: "subjectId" }, { path: "gradeId" }]
      },
      { path: "semester_id", populate: { path: "academicYear_id" } }
    ]);

    // 3. Get all exams for these subjects
    const allExams = [];
    
    for (const gss of gradeSubjectSemesters) {
      const exams = await Exam.find({
        subject_id: gss.grade_subject_id.subjectId._id,
        grade_id: gss.grade_subject_id.gradeId._id,
        academic_year_id: gss.semester_id.academicYear_id._id,
        semester_id: gss.semester_id._id,
        class_id: student.classId._id
      })
      .populate("subject_id")
      .populate("created_by", "_id fullName");

      // 4. Check status for each exam
      for (const exam of exams) {
        const session = await Session.findOne({
          student_id,
          exam_id: exam._id
        });

        let status = "upcoming";
        let result = null;

        if (session?.status === "Submitted") {
          status = "completed";
          result = await ExamResult.findOne({
            student_id,
            exam_id: exam._id
          });
        } else if (exam.exam_status === "Expired") {
          status = "missed";
        }

        allExams.push({
          ...exam.toObject(),
          status,
          subjectName: gss.grade_subject_id.subjectId.subjectName,
          result: result ? {
            score: result.total_marks,
            percentage: result.percentage,
            grade: result.status
          } : null
        });
      }
    }

    // 5. Return all exams in one response
    res.status(200).json({
      exams: allExams
    });

  } catch (error) {
    console.error("Error in getAllExamsForStudent:", error);
    res.status(500).json({
      status: 500,
      message: "Failed to get exams",
      error: error.message
    });
  }
};
module.exports = {
  getAllStudentResults,
  getMissedExamsForStudent,
  getCompletedExamsForStudent,
  getCompletedExamsForSubjects,
  getAllExamsForStudent,
};
