const AssignmentSubmission = require("../models/AssignmentSubmission");
const { fetchAssignmentById } = require("../services/assignmentService");
const {
  addAssignmentSubmission,
  getSubmissionsForAssignment,
  updateAssignmentSubmission,
  getSubmissionById,
  getAssignmentsSubmissionsByStudentId,
} = require("../services/assignmentSubmissionService");

const submitAssignment = async (req, res) => {
  try {
    const student_id = req.user.id;
    req.body.student_id = student_id;
    req.body.assignment_id = req.params.id;
    const submission = await addAssignmentSubmission(req.body);
    if (!submission._id) {
      res.status(400).json({ message: submission });
    }
    res.status(201).json({ submission });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to submit assignment", error: error.message });
  }
};

const deleteSubmission = async (req, res) => {
  try {
    const submission_id = req.params.id;
    await AssignmentSubmission.findByIdAndDelete(submission_id);
    res.status(200).json({ message: "submission deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete submission", error: error.message });
  }
};

const getAssignmentSubmissions = async (req, res) => {
  try {
    const submissions = await getSubmissionsForAssignment(req.params.id);
    console.log(req.params.id);

    res.status(200).json(submissions);
  } catch (error) {
    res.status(500).json({
      message: "Failed to get submissions",
      error: error.message,
    });
  }
};

const displaySubmission = async (req, res) => {
  try {
    const existingSubmission = await getSubmissionById(req.params.id);
    res.status(200).json({ submission: existingSubmission });
  } catch (error) {
    res.status(500).json({
      message: "Failed to display this submission",
      error: error.message,
    });
  }
};
const gradeAssignment = async (req, res) => {
  try {
    const existingSubmission = await getSubmissionById(req.params.id);
    const assignment = await fetchAssignmentById(
      existingSubmission.assignment_id._id
    );
    if (!assignment) {
      return res.status(404).json("This assignment not found");
    }
    if (assignment.total_marks < req.body.grade) {
      return res.status(404).json({
        message: "Grade can not exceed the total marks of the assignment",
      });
    }
    const submission = await updateAssignmentSubmission(
      req.params.id,
      req.body.grade
    );
    res.status(200).json(submission);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to grade assignment", error: error.message });
  }
};

const getStudentSubmissions = async (req, res) => {
  try {
    const submissions = await getAssignmentsSubmissionsByStudentId(req.user.id);
    res.status(200).json(submissions);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch submissions",
      error: error.message,
    });
  }
};
module.exports = {
  submitAssignment,
  deleteSubmission,
  getAssignmentSubmissions,
  gradeAssignment,
  displaySubmission,
  getStudentSubmissions,
};
