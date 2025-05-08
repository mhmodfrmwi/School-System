const Student = require("../DB/StudentModel");

const getStudentById = async (student_id) => {
  try {
    const student = await Student.findById(student_id)
      .populate("gradeId", "gradeName")
      .populate("classId", "className")
      .populate("academicYear_id", "startYear");
    if (!student) {
      throw new Error("Student not found");
    }
    return student;
  } catch (error) {
    throw new Error(error.message);
  }
};
async function getStudentGradeId(studentId) {
  const student = await Student.findById(studentId).populate("gradeId");
  if (!student?.gradeId) {
    const error = new Error("Student grade not found");
    error.statusCode = 404;
    throw error;
  }
  return student.gradeId._id;
}
module.exports = {
  getStudentById,
  getStudentGradeId,
};
