const Teacher = require("../DB/teacher");

const generateAcademicNumber = async (departmentCode) => {
  const lastTeacher = await Teacher.findOne().sort({ academicNumber: -1 });
  let lastNumber = 0;
  if (lastTeacher) {
    lastNumber = parseInt(lastTeacher?.academicNumber.split("-")[1]);
  }
  const newNumber = lastNumber + 1;

  return `TEA-${String(newNumber).padStart(3, "0")}-${departmentCode}`;
};

module.exports = generateAcademicNumber;
