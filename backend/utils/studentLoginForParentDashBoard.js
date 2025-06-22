const signToken = require("./signToken");
const Student = require('../DB/StudentModel');

const generateStudentToken = async (studentId) => {
  try {
    const student = await Student.findById(studentId)
      .select('email classId');
    
    if (!student) {
      throw new Error('Student not found');
    }

    return signToken(
      studentId,
      student.email,
      'student',
      student.classId
    );
  } catch (error) {
    console.error('Error generating student token:', error);
    throw error;
  }
};

module.exports = {
  generateStudentToken
};