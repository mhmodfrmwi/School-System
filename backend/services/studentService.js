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

module.exports = {
  getStudentById,
};
