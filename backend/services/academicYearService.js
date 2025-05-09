const AcademicYear = require("../DB/academicYearModel");
const Semester = require("../DB/semesterModel");

async function getCurrentAcademicYear() {
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();
  let startYear, endYear;

  if (currentMonth >= 2 && currentMonth <= 7) {
    startYear = currentYear - 1;
    endYear = currentYear;
  } else {
    startYear = currentYear;
    endYear = currentYear + 1;
  }

  const academicYear = await AcademicYear.findOne({ startYear, endYear });
  if (!academicYear) {
    const error = new Error("Academic year not found.");
    error.statusCode = 404;
    throw error;
  }
  return academicYear;
}

async function getCurrentSemester(academicYearId) {
  const currentMonth = new Date().getMonth() + 1;
  const semesterName =
    currentMonth >= 2 && currentMonth <= 7 ? "Semester 2" : "Semester 1";

  const semester = await Semester.findOne({
    semesterName,
    academicYear_id: academicYearId,
  });

  if (!semester) {
    const error = new Error("Current semester not found.");
    error.statusCode = 404;
    throw error;
  }
  return semester;
}

module.exports = {
  getCurrentAcademicYear,
  getCurrentSemester,
};
