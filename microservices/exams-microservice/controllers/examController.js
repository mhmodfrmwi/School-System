const GradeSubjectSemester = require("../models/GradeSubjectSemester");
const {
  addExam,
  fetchExams,
  fetchExamById,
  fetchExamsByAttributes,
  updateExam,
  deleteExam,
} = require("../services/examService");
const { getExamResultsByExamId } = require("../services/resultsService");

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
      gradeSubjectSemester.grade_subject_id.academicYear_id;
    const semester_id = gradeSubjectSemester.semester_id._id;

    req.body.subject_id = subject_id;
    req.body.grade_id = grade_id;
    req.body.academic_year_id = academic_year_id;
    req.body.semester_id = semester_id;
    req.body.class_id = class_id;
    console.log(req.body);

    const exam = await addExam(req.body);
    res.status(201).json(exam);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to create exam", err: err.message });
  }
};

const getExams = async (req, res) => {
  let exams;
  try {
    if (req.query.gradeSubjectSemesterId && req.query.classId) {
      const grade_subject_semester_id = req.query.gradeSubjectSemesterId;
      const class_id = req.query.classId;
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

      exams = await fetchExamsByAttributes(
        class_id,
        semester_id,
        grade_id,
        subject_id,
        academic_year_id
      );
    } else {
      exams = await fetchExams();
    }
    const formattedExams = exams.map((exam) => ({
      ...exam.toObject(),
      status: exam.exam_status,
    }));
    res.status(200).json({ exams: formattedExams, count: exams.length });
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
    const formattedExam = { ...exam.toObject(), status: exam.exam_status };
    res.status(200).json({ exam: formattedExam });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Failed to fetch exam", err: err.message });
  }
};

const updateExamById = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedExam = await updateExam(id, updateData);
    if (!updatedExam) {
      return res.status(404).json({ message: "Exam not found" });
    }

    res.status(200).json({ exam: updatedExam });
  } catch (err) {
    console.log(err.message);
    res
      .status(500)
      .json({ message: "Failed to update exam", err: err.message });
  }
};

const deleteExamById = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedExam = await deleteExam(id);
    if (!deletedExam) {
      return res.status(404).json({ message: "Exam not found" });
    }

    res.status(200).json({ message: "Exam deleted successfully" });
  } catch (err) {
    console.log(err.message);
    res
      .status(500)
      .json({ message: "Failed to delete exam", err: err.message });
  }
};

const getExamResultsForTeacher = async (req, res) => {
  try {
    const results = await getExamResultsByExamId(req.params.id);
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Failed to get exam results for teacher",
      error: error.message,
    });
  }
};
module.exports = {
  createExam,
  getExams,
  getExam,
  updateExamById,
  deleteExamById,
  getExamResultsForTeacher,
};
