const Assignment = require("../models/Assignment");
const AssignmentSubmission = require("../models/AssignmentSubmission");

const GradeSubjectSemester = require("../models/GradeSubjectSemester");
const {
  addAssignment,
  fetchAssignments,
  updateAssignment,
  deleteAssignment,
  fetchAssignmentById,
  fetchAssignmentsByAttributes,
  fetchAssignmentsByTeacherIdAndSubjectAttributes,
  fetchAssignmentsByTeacherId,
} = require("../services/assignmentService");
const { fetchExamsByAttributes } = require("../services/examService");

const createAssignment = async (req, res) => {
  try {
    const { title, description, due_date, created_by, total_marks } = req.body;

    if (!title || !description || !due_date || !created_by || !total_marks) {
      return res.status(400).json({ message: "Missing required fields" });
    }

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
    console.log(subject_id);
    console.log(grade_id);
    console.log(academic_year_id);
    console.log(semester_id);

    req.body.subject_id = subject_id;
    req.body.grade_id = grade_id;
    req.body.academic_year_id = academic_year_id;
    req.body.semester_id = semester_id;
    req.body.class_id = class_id;

    const assignment = await addAssignment(req.body);
    const newAssignment = await Assignment.findById(assignment._id)
      .populate("created_by", "fullName")
      .populate("subject_id", "subjectName")
      .populate("class_id", "className")
      .populate("grade_id", "gradeName")
      .populate("academic_year_id", "startYear endYear")
      .populate("semester_id", "semesterName");
    res.status(200).json(newAssignment);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to create assignment", error: error.message });
  }
};

const updateAssignmentById = async (req, res) => {
  try {
    const assignment = await updateAssignment(req.params.id, req.body);
    res.status(200).json(assignment);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to update assignment", error: error.message });
  }
};

const deleteAssignmentById = async (req, res) => {
  try {
    const submissions = await AssignmentSubmission.find({
      assignment_id: req.params.id,
    });
    if (submissions) {
      return res.status(400).json({
        message:
          "This assignment can not be deleted because it has submissions",
      });
    }
    const assignment = await deleteAssignment(req.params.id);
    res.status(200).json({ message: "Assignment deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to delete assignment",
      error: error.message,
    });
  }
};

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

const getAssignmentsForTeacher = async (req, res) => {
  try {
    const teacher_id = req.user.id;
    let assignments;
    if (req.query.gradeSubjectSemesterId) {
      const grade_subject_semester_id = req.query.gradeSubjectSemesterId;
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

      assignments = await fetchAssignmentsByTeacherIdAndSubjectAttributes(
        teacher_id,
        subject_id,
        grade_id,
        academic_year_id,
        semester_id
      );
    } else {
      assignments = await fetchAssignmentsByTeacherId(teacher_id);
    }
    res.status(200).json({ assignments, count: assignments.length });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Failed to get assignments for teacher",
      error: error.message,
    });
  }
};
module.exports = {
  createAssignment,
  updateAssignmentById,
  deleteAssignmentById,
  getAssignmentById,
  getAssignments,
  getAssignmentsForTeacher,
};
