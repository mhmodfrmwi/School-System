const GradeSubjectSemester = require("../models/GradeSubjectSemester");
const {
  addExam,
  fetchExams,
  fetchExamById,
} = require("../services/examService");

const createExam = async (req, res) => {
  try {
    const class_id = req.query.classId;

    const grade_subject_semester_id = req.params.id;
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
      gradeSubjectSemester.grade_subject_id.gradeId.academicYear_id;
    const semester_id = gradeSubjectSemester.semester_id._id;

    req.body.subject_id = subject_id;
    req.body.grade_id = grade_id;
    req.body.academic_year_id = academic_year_id;
    req.body.semester_id = semester_id;
    req.body.class_id = class_id;

    const exam = await addExam(req.body);
    res.status(201).json(exam);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to create exam", err: err.message });
  }
};

const getExams = async (req, res) => {
  try {
    const exams = await fetchExams();
    res.status(200).json(exams);
  } catch (err) {
    console.log(err.message);
    res
      .status(500)
      .json({ message: "Failed to fetch exams", err: err.message });
  }
};

const getExam = async (req, res) => {
  try {
    const exam = await fetchExamById(req.params.id);
    if (!exam) {
      return res.status(404).json({ message: "Exam not found" });
    }
    res.status(200).json(exam);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Failed to fetch exam", err: err.message });
  }
};

module.exports = { createExam, getExams, getExam };
