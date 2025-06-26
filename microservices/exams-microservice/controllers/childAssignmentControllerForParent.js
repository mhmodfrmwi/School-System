const Assignment = require("../models/Assignment");
const AssignmentSubmission = require("../models/AssignmentSubmission");
const Student = require("../models/Student")
const GradeSubjectSemester = require("../models/GradeSubjectSemester");
const {
  fetchAssignments,
  fetchAssignmentById,
  fetchAssignmentsByAttributes,
  fetchAssignmentsForAllSubjectsByAttributes
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
  try {
    const { student_id, gradeSubjectSemesterId } = req.params;

    const student = await Student.findById(student_id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    const class_id = student.classId;

    const gradeSubjectSemester = await GradeSubjectSemester.findById(gradeSubjectSemesterId)
      .populate([
        {
          path: "grade_subject_id",
          populate: [
            { path: "gradeId" },
            { path: "academicYear_id" },
          ],
        },
        { path: "semester_id" },
      ]);

    if (!gradeSubjectSemester) {
      return res.status(404).json({ message: "GradeSubjectSemester not found" });
    }

    if (!gradeSubjectSemester.grade_subject_id) {
      return res.status(500).json({ message: "grade_subject_id is null or not populated" });
    }

    const grade_id = gradeSubjectSemester.grade_subject_id.gradeId._id;
    const academic_year_id = gradeSubjectSemester.grade_subject_id.academicYear_id;
    const semester_id = gradeSubjectSemester.semester_id._id;

    const assignments = await fetchAssignmentsForAllSubjectsByAttributes(
      class_id,
      semester_id,
      grade_id,
      academic_year_id
    );

    res.status(200).json(assignments);
  } catch (error) {
    console.error(error);
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
    const { student_id, gradeSubjectSemesterId } = req.params;

    const student = await Student.findById(student_id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    const class_id = student.classId;

    const gradeSubjectSemester = await GradeSubjectSemester.findById(gradeSubjectSemesterId)
      .populate([
        {
          path: "grade_subject_id",
          populate: [
            { path: "gradeId" },
            { path: "academicYear_id" },
          ],
        },
        { path: "semester_id" },
      ]);

    if (!gradeSubjectSemester) {
      return res.status(404).json({ message: "GradeSubjectSemester not found" });
    }

    if (!gradeSubjectSemester.grade_subject_id) {
      return res.status(500).json({ message: "grade_subject_id is null or not populated" });
    }

    const grade_id = gradeSubjectSemester.grade_subject_id.gradeId._id;
    const academic_year_id = gradeSubjectSemester.grade_subject_id.academicYear_id;
    const semester_id = gradeSubjectSemester.semester_id._id;

    const missedAssignments = await getMissedAssignments(
      student_id,
      semester_id,
      grade_id,
      academic_year_id,
      class_id
    );

    res.status(200).json(missedAssignments);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch missed assignments",
      error: error.message,
    });
  }
};

/*const getCompletedAssignmentsForStudent = async (req, res) => {
  try {
    const student_id = req.params.student_id;
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
};*/
const getCompletedAssignmentsForStudent = async (req, res) => {
  try {
    const { student_id, gradeSubjectSemesterId } = req.params;

    const student = await Student.findById(student_id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    const class_id = student.classId;

    const gradeSubjectSemester = await GradeSubjectSemester.findById(gradeSubjectSemesterId)
      .populate([
        {
          path: "grade_subject_id",
          populate: [
            { path: "gradeId" },
            { path: "academicYear_id" },
          ],
        },
        { path: "semester_id" },
      ]);

    if (!gradeSubjectSemester) {
      return res.status(404).json({ message: "GradeSubjectSemester not found" });
    }

    if (!gradeSubjectSemester.grade_subject_id) {
      return res.status(500).json({ message: "grade_subject_id is null or not populated" });
    }

    const grade_id = gradeSubjectSemester.grade_subject_id.gradeId._id;
    const academic_year_id = gradeSubjectSemester.grade_subject_id.academicYear_id;
    const semester_id = gradeSubjectSemester.semester_id._id;

    const completedAssignments = await getCompletedAssignments(
      student_id,
      semester_id,
      grade_id,
      academic_year_id,
      class_id
    );

    res.status(200).json(completedAssignments);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch completed assignments",
      error: error.message,
    });
  }
};

const getUpcomingUnsubmittedAssignments = async (req, res) => {
  try {
    const { student_id, gradeSubjectSemesterId } = req.params;

    const student = await Student.findById(student_id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    const class_id = student.classId;

    const gradeSubjectSemester = await GradeSubjectSemester.findById(gradeSubjectSemesterId)
      .populate([
        {
          path: "grade_subject_id",
          populate: [
            { path: "gradeId" },
            { path: "academicYear_id" },
          ],
        },
        { path: "semester_id" },
      ]);

    if (!gradeSubjectSemester) {
      return res.status(404).json({ message: "GradeSubjectSemester not found" });
    }

    if (!gradeSubjectSemester.grade_subject_id) {
      return res.status(500).json({ message: "grade_subject_id is null or not populated" });
    }

    const grade_id = gradeSubjectSemester.grade_subject_id.gradeId._id;
    const academic_year_id = gradeSubjectSemester.grade_subject_id.academicYear_id;
    const semester_id = gradeSubjectSemester.semester_id._id;

    const allAssignments = await Assignment.find({
      class_id,
      semester_id,
      grade_id,
      academic_year_id,
      due_date: { $gt: new Date() },
    });
    const unsubmittedUpcomingAssignments = [];

    for (const assignment of allAssignments) {
      const alreadySubmitted = await AssignmentSubmission.findOne({
        assignment_id: assignment._id,
        student_id,
      });

      if (!alreadySubmitted) {
        unsubmittedUpcomingAssignments.push(assignment);
      }
    }

    res.status(200).json(unsubmittedUpcomingAssignments);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch unsubmitted and active assignments",
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
  getUpcomingUnsubmittedAssignments
};

