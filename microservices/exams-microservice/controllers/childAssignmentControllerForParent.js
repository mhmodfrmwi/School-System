const Assignment = require("../models/Assignment");
const AssignmentSubmission = require("../models/AssignmentSubmission");

const GradeSubjectSemester = require("../models/GradeSubjectSemester");
const {
  fetchAssignments,
  fetchAssignmentById,
  fetchAssignmentsByAttributes,
} = require("../services/assignmentService");
const {
  addAssignmentSubmission,
  getSubmissionsForAssignment,
  updateAssignmentSubmission,
  getSubmissionById,
  getAssignmentsSubmissionsByStudentId,
  getMissedAssignments,
  getCompletedAssignments,
} = require("../services/assignmentSubmissionService");
const { fetchExamsByAttributes } = require("../services/examService");

const getAssignmentById = async (req, res) => {
  try {
    const assignment = await fetchAssignmentById(req.params.id);
    res.status(200).json(assignment);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch assignment",
      error: error.message,
    });
  }
};

const getAssignments = async (req, res) => {
  let assignments;
  try {
    if (req.query.gradeSubjectSemesterId) {
      const grade_subject_semester_id = req.query.gradeSubjectSemesterId;
      const class_id = req.user.classId;
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

      assignments = await fetchAssignmentsByAttributes(
        class_id,
        semester_id,
        grade_id,
        subject_id,
        academic_year_id
      );
    } else {
      assignments = await fetchAssignments();
    }
    res.status(200).json(assignments);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch assignments",
      error: error.message,
    });
  }
};



const getStudentSubmissions = async (req, res) => {
  try {
    const {studentId}= req.params;
    const submissions = await getAssignmentsSubmissionsByStudentId(studentId);
    res.status(200).json(submissions);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch submissions",
      error: error.message,
    });
  }
};

const getMissedAssignmentsForStudent = async (req, res) => {
  try {
    const student_id = req.params;
    const { class_id, semester_id, academic_year_id, grade_id } = req.body;

    if (!class_id || !semester_id || !academic_year_id || !grade_id) {
      return res.status(400).json({
        message: "Please provide all required fields",
      });
    }
    const missedAssignments = await getMissedAssignments(
      student_id,
      semester_id,
      grade_id,
      academic_year_id,
      class_id
    );
    res.status(200).json(missedAssignments);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch missed assignments",
      error: error.message,
    });
  }
};

const getCompletedAssignmentsForStudent = async (req, res) => {
  try {
    const student_id = req.params;
    const { class_id, semester_id, academic_year_id, grade_id } = req.body;
    if (!class_id || !semester_id || !academic_year_id || !grade_id) {
      return res.status(400).json({
        message: "Please provide all required fields",
      });
    }
    const completedAssignments = await getCompletedAssignments(
      student_id,
      semester_id,
      grade_id,
      academic_year_id,
      class_id
    );
    res.status(200).json(completedAssignments);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch completed assignments",
      error: error.message,
    });
  }
};

module.exports = {
  getAssignmentById,
  getAssignments,

  getStudentSubmissions,
  getMissedAssignmentsForStudent,
  getCompletedAssignmentsForStudent,
};

