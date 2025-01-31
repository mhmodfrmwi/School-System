const expressAsyncHandler = require("express-async-handler");
const validateObjectId = require("../../utils/validateObjectId");
const Parent = require("../../DB/Parent");
const ParentStudent = require("../../DB/parentStudent");
const student = require("../../DB/student");
const createParentStudent = async (parentId, studentAcademicNumber) => {
  const parent = await Parent.findById(parentId);
  if (!parent) {
    throw new Error("Parent not found");
  }
  const studentRecord = await student.findOne({
    academic_number: studentAcademicNumber,
  });

  if (!studentRecord) {
    throw new Error("Student not found");
  }
  const existingStudentWithAnyParent = await ParentStudent.findOne({
    student_id: studentRecord._id,
  });
  if (existingStudentWithAnyParent) {
    throw new Error(`${studentRecord.fullName} already has a parent`);
  }
  const existingParentStudent = await ParentStudent.findOne({
    parent_id: parent._id,
    student_id: studentRecord._id,
  });
  if (existingParentStudent) {
    throw new Error("Parent-Student relationship already exists");
  }
  const parentStudent = new ParentStudent({
    parent_id: parent._id,
    student_id: studentRecord._id,
  });

  await parentStudent.save();
  return parentStudent;
};
const deleteParentStudent = expressAsyncHandler(async (req, res) => {
  const parentStudentId = req.params.id;
  if (!validateObjectId(parentStudentId)) {
    return res.status(400).json({
      status: 400,
      message: "Invalid Parent-Student ID",
    });
  }
  const parentStudent = await ParentStudent.findByIdAndDelete(parentStudentId);
  if (!parentStudent) {
    return res.status(404).json({
      status: 404,
      message: "Parent-Student not found",
    });
  }
  res.status(200).json({
    status: 200,
    message: "Parent-Student relationship deleted successfully",
  });
});
module.exports = {
  createParentStudent,
  deleteParentStudent,
};
