const AssignmentSubmission = require("../models/AssignmentSubmission");
const {
  fetchAssignmentsForAllSubjectsByAttributes,
} = require("./assignmentService");

const addAssignmentSubmission = async (assignmentSubmissionData) => {
  try {
    const assignment_id = assignmentSubmissionData.assignment_id;
    const student_id = assignmentSubmissionData.student_id;
    const existingSubmission = await AssignmentSubmission.findOne({
      assignment_id,
      student_id,
    });
    if (existingSubmission) {
      return "You have submitted this assignment before";
    }
    const assignmentSubmission = new AssignmentSubmission(
      assignmentSubmissionData
    );
    await assignmentSubmission.save();
    const status = await assignmentSubmission.getStatus();
    const submission = {
      ...assignmentSubmission._doc,
      status,
    };
    return submission;
  } catch (error) {
    console.log(error);
    throw new Error(`Failed to create assignment submission: ${error.message}`);
  }
};

const getSubmissionsForAssignment = async (id) => {
  try {
    const assignmentSubmissions = await AssignmentSubmission.find({
      assignment_id: id,
    })
      .select("-__v -createdAt -updatedAt")
      .populate("student_id", "fullName");
    const submissions = await Promise.all(
      assignmentSubmissions.map(async (submission) => {
        const status = await submission.getStatus();
        return {
          ...submission.toObject(),
          status,
        };
      })
    );
    return submissions;
  } catch (error) {
    console.log(error);
    throw new Error(`Failed to get assignment submissions: ${error.message}`);
  }
};

const updateAssignmentSubmission = async (id, grade) => {
  try {
    const submission = await AssignmentSubmission.findByIdAndUpdate(
      id,
      {
        grade: grade,
      },
      { new: true }
    );
    return submission;
  } catch (error) {
    console.log(error);
    throw new Error(
      `Failed to update assignment's submission: ${error.message}`
    );
  }
};

const getSubmissionById = async (id) => {
  try {
    const submission = await AssignmentSubmission.findById(id)
      .populate({
        path: "assignment_id",
        populate: [
          {
            path: "subject_id",
            select: "subjectName",
          },
          {
            path: "grade_id",
            select: "gradeName",
          },
          {
            path: "class_id",
            select: "className",
          },
          {
            path: "academic_year_id",
            select: "startYear endYear",
          },
          {
            path: "semester_id",
            select: "semesterName",
          },
        ],
      })
      .populate("student_id", "fullName")
      .select("-__v -createdAt -updatedAt");
    return submission;
  } catch (error) {
    console.log(error);
    throw new Error(
      `Failed to fetch assignment's submission: ${error.message}`
    );
  }
};

const getAssignmentsSubmissionsByStudentId = async (student_id) => {
  try {
    const submissions = await AssignmentSubmission.find({ student_id })
      .populate({
        path: "assignment_id",
        populate: [
          {
            path: "subject_id",
            select: "subjectName",
          },
          {
            path: "grade_id",
            select: "gradeName",
          },
          {
            path: "class_id",
            select: "className",
          },
          {
            path: "academic_year_id",
            select: "startYear endYear",
          },
          {
            path: "semester_id",
            select: "semesterName",
          },
        ],
      })
      .populate("student_id", "fullName")
      .select("-__v -createdAt -updatedAt");

    return submissions;
  } catch (error) {
    console.log(error);
    throw new Error(`Failed to fetch submissions: ${error.message}`);
  }
};

const getMissedAssignments = async (
  student_id,
  semester_id,
  grade_id,
  academic_year_id,
  class_id
) => {
  try {
    const assignments = await fetchAssignmentsForAllSubjectsByAttributes(
      class_id,
      semester_id,
      grade_id,
      academic_year_id
    );
    const missedAssignments = [];

    for (const assignment of assignments) {
      const submission = await AssignmentSubmission.findOne({
        assignment_id: assignment._id,
        student_id: student_id,
      });
      if (!submission) {
        missedAssignments.push(assignment);
      }
    }
    return missedAssignments;
  } catch (error) {
    console.log(error);
    throw new Error(`Failed to fetch missed assignments: ${error.message}`);
  }
};
const getCompletedAssignments = async (
  student_id,
  semester_id,
  grade_id,
  academic_year_id,
  class_id
) => {
  try {
    const assignments = await fetchAssignmentsForAllSubjectsByAttributes(
      class_id,
      semester_id,
      grade_id,
      academic_year_id
    );
    const completedAssignments = [];

    for (const assignment of assignments) {
      const submission = await AssignmentSubmission.findOne({
        assignment_id: assignment._id,
        student_id: student_id,
      });
      if (submission) {
        completedAssignments.push(assignment);
      }
    }
    return completedAssignments;
  } catch (error) {
    console.log(error);
    throw new Error(`Failed to fetch completed assignments: ${error.message}`);
  }
};
module.exports = {
  addAssignmentSubmission,
  getSubmissionsForAssignment,
  updateAssignmentSubmission,
  getSubmissionById,
  getAssignmentsSubmissionsByStudentId,
  getMissedAssignments,
  getCompletedAssignments,
};
