const Assignment = require("../models/Assignment");
const AssignmentSubmission = require("../models/AssignmentSubmission");

const addAssignment = async (assignmentData) => {
  try {
    const assignment = new Assignment(assignmentData);
    await assignment.save();
    return assignment;
  } catch (error) {
    throw new Error(`Failed to create assignment: ${error.message}`);
  }
};

const fetchAssignments = async () => {
  try {
    const assignments = await Assignment.find()
      .populate("created_by", "fullName")
      .populate("subject_id", "subjectName")
      .populate("class_id", "className")
      .populate("grade_id", "gradeName")
      .populate("academic_year_id", "startYear endYear")
      .populate("semester_id", "semesterName");
    return assignments;
  } catch (error) {
    throw new Error(`Failed to fetch assignments: ${error.message}`);
  }
};

const fetchAssignmentsByAttributes = async (
  class_id,
  semester_id,
  grade_id,
  subject_id,
  academic_year_id
) => {
  try {
    const assignments = await Assignment.find({
      class_id,
      semester_id,
      grade_id,
      subject_id,
      academic_year_id,
    })
      .populate("created_by", "fullName")
      .populate("subject_id", "subjectName")
      .populate("class_id", "className")
      .populate("grade_id", "gradeName")
      .populate("academic_year_id", "startYear endYear")
      .populate("semester_id", "semesterName");
    return assignments;
  } catch (error) {
    throw new Error(`Failed to fetch assignments: ${error.message}`);
  }
};
const fetchAssignmentsForAllSubjectsByAttributes = async (
  class_id,
  semester_id,
  grade_id,
  academic_year_id
) => {
  try {
    // console.log(class_id, semester_id, grade_id, academic_year_id);

    const assignments = await Assignment.find({
      class_id,
      semester_id,
      grade_id,
      academic_year_id,
    })
      .populate("created_by", "fullName")
      .populate("subject_id", "subjectName")
      .populate("class_id", "className")
      .populate("grade_id", "gradeName")
      .populate("academic_year_id", "startYear endYear")
      .populate("semester_id", "semesterName");
    // console.log(assignments);

    return assignments;
  } catch (error) {
    throw new Error(`Failed to fetch assignments: ${error.message}`);
  }
};
const fetchAssignmentsByTeacherId = async (teacher_id) => {
  try {
    const assignments = await Assignment.find({ created_by: teacher_id })
      .populate("created_by", "fullName")
      .populate("subject_id", "subjectName")
      .populate("class_id", "className")
      .populate("grade_id", "gradeName")
      .populate("academic_year_id", "startYear endYear")
      .populate("semester_id", "semesterName")
      .select("-__v -createdAt -updatedAt");
    return assignments;
  } catch (error) {
    console.error(error);
    throw new Error(`Failed to fetch assignments: ${error.message}`);
  }
};
const fetchAssignmentsByTeacherIdAndSubjectAttributes = async (
  teacher_id,
  subject_id,
  grade_id,
  academic_year_id,
  semester_id
) => {
  try {
    const assignments = await Assignment.find({
      created_by: teacher_id,
      subject_id,
      grade_id,
      academic_year_id,
      semester_id,
    })
      .populate("created_by", "fullName")
      .populate("subject_id", "subjectName")
      .populate("class_id", "className")
      .populate("grade_id", "gradeName")
      .populate("academic_year_id", "startYear endYear")
      .populate("semester_id", "semesterName")
      .select("-__v -createdAt -updatedAt");
    return assignments;
  } catch (error) {
    console.error(error);
    throw new Error(`Failed to fetch assignments: ${error.message}`);
  }
};
const fetchAssignmentById = async (id) => {
  try {
    const assignment = await Assignment.findById(id)
      .populate("created_by", "fullName")
      .populate("subject_id", "subjectName")
      .populate("class_id", "className")
      .populate("grade_id", "gradeName")
      .populate("academic_year_id", "startYear endYear")
      .populate("semester_id", "semesterName");
    if (!assignment) {
      throw new Error("Assignment not found");
    }
    return assignment;
  } catch (error) {
    throw new Error(`Failed to fetch assignment by ID: ${error.message}`);
  }
};

const updateAssignment = async (id, assignmentData) => {
  try {
    const assignment = await Assignment.findByIdAndUpdate(id, assignmentData, {
      new: true,
    });
    if (!assignment) {
      throw new Error("Assignment not found");
    }
    return assignment;
  } catch (error) {
    throw new Error(`Failed to update assignment by ID: ${error.message}`);
  }
};

const deleteAssignment = async (id) => {
  if (!id) {
    throw new Error("Invalid assignment ID");
  }

  try {
    const result = await Assignment.findByIdAndDelete(id);
    if (!result) {
      throw new Error("Assignment not found");
    }

    const submissions = await AssignmentSubmission.deleteMany({
      assignment_id: id,
    });

    console.log(`Deleted assignment with ID: ${id}`);
    console.log(`Deleted ${submissions.deletedCount} submissions`);

    return {
      deletedAssignment: result,
    };
  } catch (error) {
    console.error(`Failed to delete assignment by ID ${id}: ${error.message}`);
    throw new Error(`Failed to delete assignment by ID: ${error.message}`);
  }
};
module.exports = {
  addAssignment,
  fetchAssignments,
  fetchAssignmentsByAttributes,
  fetchAssignmentById,
  updateAssignment,
  deleteAssignment,
  fetchAssignmentsByTeacherId,
  fetchAssignmentsByTeacherIdAndSubjectAttributes,
  fetchAssignmentsForAllSubjectsByAttributes,
};
