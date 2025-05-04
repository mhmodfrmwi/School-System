// services/studentGradeService.js
const moment = require("moment");
const Score = require("../DB/scoreModel");
const SubjectScore = require("../DB/subjectScoreModel");
const Student = require("../DB/student");
const AcademicYear = require("../DB/academicYearModel");
const Semester = require("../DB/semesterModel");
const GradeSubject = require("../DB/gradeSubject");
const GradeSubjectSemester = require("../DB/gradeSubjectSemester");
const Subject = require("../DB/subjectModel");

/**
 * Get current academic year and semester based on the current date
 * @returns {Object} Object containing academic year info and semester name
 */
const getCurrentAcademicInfo = () => {
  const currentYear = moment().year().toString().slice(-2);
  const currentMonth = moment().month() + 1;
  let startYear, endYear, semester_name;

  if (currentMonth >= 9 && currentMonth <= 12) {
    startYear = "20" + parseInt(currentYear);
    endYear = "20" + (parseInt(currentYear) + 1);
    semester_name = "Semester 1";
  } else {
    startYear = "20" + (parseInt(currentYear) - 1);
    endYear = "20" + parseInt(currentYear);
    semester_name = "Semester 2";
  }

  return { startYear, endYear, semester_name };
};

/**
 * Get student by ID
 * @param {string} studentId - The ID of the student
 * @returns {Object} Student document or null
 */
const getStudentById = async (studentId) => {
  return await Student.findById({ _id: studentId });
};

/**
 * Get academic year by start and end years
 * @param {string} startYear - Start year
 * @param {string} endYear - End year
 * @returns {Object} Academic year document or null
 */
const getAcademicYear = async (startYear, endYear) => {
  return await AcademicYear.findOne({ startYear, endYear });
};

/**
 * Get semester by name and academic year ID
 * @param {string} semesterName - Name of the semester
 * @param {string} academicYearId - Academic year ID
 * @returns {Object} Semester document or null
 */
const getSemester = async (semesterName, academicYearId) => {
  return await Semester.findOne({
    semesterName,
    academicYear_id: academicYearId,
  });
};

/**
 * Get grades for a specific student in a specific subject
 * @param {string} studentId - The ID of the student
 * @param {string} subjectId - The ID of the subject
 * @returns {Object} Object containing student grades for the subject
 */
const getStudentSubjectGrades = async (studentId, subjectId) => {
  const student = await getStudentById(studentId);
  if (!student) {
    throw new Error("Student not found.");
  }

  const gradeId = student.gradeId;
  const { startYear, endYear, semester_name } = getCurrentAcademicInfo();

  const academic_year = await getAcademicYear(startYear, endYear);
  if (!academic_year) {
    throw new Error("Academic year not found.");
  }
  const academicYearId = academic_year._id;

  const semester = await getSemester(semester_name, academicYearId);
  if (!semester) {
    throw new Error("Semester not found in the given academic year.");
  }
  const semesterId = semester._id;

  const subjectScores = await SubjectScore.find({
    subjectId,
    gradeId,
    semesterId,
  });

  if (!subjectScores.length) {
    throw new Error(
      "No subject scores found for the given subject, grade, and semester."
    );
  }

  const grades = await Promise.all(
    subjectScores.map(async (subjectScore) => {
      const studentGrades = await Score.find({
        studentId,
        subjectScoreId: subjectScore._id,
      });

      return {
        type: subjectScore.type,
        examGrade: studentGrades.length > 0 ? studentGrades[0].examGrade : null,
        finalDegree: subjectScore.finalDegree,
      };
    })
  );

  const midtermData = grades.find((grade) => grade.type === "midterm");
  const finalData = grades.find((grade) => grade.type === "final");

  return {
    subjectId,
    gradeId,
    semesterId,
    midterm: midtermData || { examGrade: null, finalDegree: null },
    final: finalData || { examGrade: null, finalDegree: null },
  };
};

/**
 * Get all current semester grades for a student
 * @param {string} studentId - The ID of the student
 * @returns {Array} Array of objects containing student grades for all subjects in the current semester
 */
const getStudentCurrentSemesterGrades = async (studentId) => {
  const student = await getStudentById(studentId);
  if (!student) {
    throw new Error("Student not found.");
  }

  const gradeId = student.gradeId;
  const { startYear, endYear, semester_name } = getCurrentAcademicInfo();

  const academic_year = await getAcademicYear(startYear, endYear);
  if (!academic_year) {
    throw new Error("Academic year not found.");
  }
  const academicYearId = academic_year._id;

  const semester = await getSemester(semester_name, academicYearId);
  if (!semester) {
    throw new Error("Semester not found in the given academic year.");
  }
  const semesterId = semester._id;

  const gradeSubjects = await GradeSubject.find({
    gradeId,
    academicYear_id: academicYearId,
  }).populate("subjectId");

  if (!gradeSubjects.length) {
    throw new Error("No subjects found for the given grade and academic year.");
  }

  const gradeSubjectSemesters = await GradeSubjectSemester.find({
    grade_subject_id: { $in: gradeSubjects.map((gs) => gs._id) },
    semester_id: semesterId,
  });

  if (!gradeSubjectSemesters.length) {
    throw new Error("No subjects found for the current semester.");
  }

  const subjectIds = gradeSubjectSemesters.map(
    (gss) =>
      gradeSubjects.find((gs) => gs._id.equals(gss.grade_subject_id)).subjectId
  );

  const subjects = await Subject.find({ _id: { $in: subjectIds } });
  if (!subjects.length) {
    throw new Error("No subjects found for the given grade and semester.");
  }

  return await Promise.all(
    subjects.map(async (subject) => {
      const subjectScores = await SubjectScore.find({
        subjectId: subject._id,
        gradeId,
        semesterId,
      });

      const subjectGrades = await Promise.all(
        subjectScores.map(async (subjectScore) => {
          const studentGrades = await Score.find({
            studentId,
            subjectScoreId: subjectScore._id,
          });

          return {
            type: subjectScore.type,
            examGrade:
              studentGrades.length > 0 ? studentGrades[0].examGrade : null,
            finalDegree: subjectScore.finalDegree,
          };
        })
      );

      const midtermData = subjectGrades.find(
        (grade) => grade.type === "midterm"
      );
      const finalData = subjectGrades.find((grade) => grade.type === "final");

      return {
        subjectId: subject._id,
        subjectName: subject.subjectName,
        midterm: midtermData || { examGrade: null, finalDegree: null },
        final: finalData || { examGrade: null, finalDegree: null },
      };
    })
  );
};

/**
 * Get student grades for all semesters in a well-structured format
 * @param {string} studentId - The ID of the student
 * @returns {Array} Formatted array of objects containing student grades organized by academic year and semester
 */
const getAllSemestersGrades = async (studentId) => {
  const student = await getStudentById(studentId);
  if (!student) {
    throw new Error("Student not found.");
  }

  const gradeId = student.gradeId;

  const academicYears = await AcademicYear.find().sort({ startYear: 1 });
  if (!academicYears.length) {
    throw new Error("No academic years found.");
  }

  const semesters = await Semester.find({
    academicYear_id: { $in: academicYears.map((ay) => ay._id) },
  }).sort({ academicYear_id: 1, semesterName: 1 });

  if (!semesters.length) {
    throw new Error("No semesters found.");
  }

  const academicYearSemesterStructure = [];

  for (const academicYear of academicYears) {
    const yearSemesters = semesters.filter(
      (s) => s.academicYear_id.toString() === academicYear._id.toString()
    );

    if (yearSemesters.length === 0) {
      academicYearSemesterStructure.push({
        academicYear,
        semester: "Semester 1",
        grades: [],
      });
      academicYearSemesterStructure.push({
        academicYear,
        semester: "Semester 2",
        grades: [],
      });
    } else {
      for (const semester of yearSemesters) {
        academicYearSemesterStructure.push({
          academicYear,
          semester: semester.semesterName,
          grades: [],
          semesterId: semester._id,
        });
      }
    }
  }

  const gradeSubjects = await GradeSubject.find({ gradeId }).populate(
    "subjectId"
  );

  if (gradeSubjects.length === 0) {
    return academicYearSemesterStructure.map(({ semesterId, ...rest }) => rest);
  }

  const gradeSubjectSemesters = await GradeSubjectSemester.find({
    grade_subject_id: { $in: gradeSubjects.map((gs) => gs._id) },
    semester_id: { $in: semesters.map((s) => s._id) },
  });

  if (gradeSubjectSemesters.length === 0) {
    return academicYearSemesterStructure.map(({ semesterId, ...rest }) => rest);
  }

  const allSubjectScores = await SubjectScore.find({
    gradeId,
    semesterId: { $in: semesters.map((s) => s._id) },
  }).populate("subjectId");

  const allStudentScores = await Score.find({
    studentId,
    subjectScoreId: { $in: allSubjectScores.map((ss) => ss._id) },
  });

  for (const semesterData of academicYearSemesterStructure) {
    if (!semesterData.semesterId) continue;

    const semesterSubjectScores = allSubjectScores.filter(
      (score) =>
        score.semesterId.toString() === semesterData.semesterId.toString()
    );

    const subjectsInSemester = new Map();

    for (const subjectScore of semesterSubjectScores) {
      const subjectId = subjectScore.subjectId._id.toString();
      const subjectName = subjectScore.subjectId.subjectName;

      if (!subjectsInSemester.has(subjectId)) {
        subjectsInSemester.set(subjectId, {
          subjectId: subjectScore.subjectId,
          subjectName,
          midterm: { examGrade: null, finalDegree: null },
          final: { examGrade: null, finalDegree: null },
        });
      }

      const studentGrade = allStudentScores.find(
        (score) =>
          score.subjectScoreId.toString() === subjectScore._id.toString()
      );

      if (subjectScore.type === "midterm") {
        subjectsInSemester.get(subjectId).midterm = {
          examGrade: studentGrade ? studentGrade.examGrade : null,
          finalDegree: subjectScore.finalDegree,
        };
      } else if (subjectScore.type === "final") {
        subjectsInSemester.get(subjectId).final = {
          examGrade: studentGrade ? studentGrade.examGrade : null,
          finalDegree: subjectScore.finalDegree,
        };
      }
    }

    semesterData.grades = Array.from(subjectsInSemester.values());
  }

  return academicYearSemesterStructure.map(({ semesterId, ...rest }) => rest);
};

/**
 * Get formatted grades report for a student
 * @param {string} studentId - The ID of the student
 * @returns {Object} Comprehensive grades report with additional statistics
 */
const getStudentGradesReport = async (studentId) => {
  const allGrades = await getAllSemestersGrades(studentId);

  // Calculate additional statistics
  let totalExamGrades = 0;
  let totalPossiblePoints = 0;
  let subjectsWithGrades = 0;
  let highestGrade = { subject: null, grade: 0 };
  let lowestGrade = { subject: null, grade: 100 };

  const subjectPerformance = {};

  allGrades.forEach((semesterData) => {
    semesterData.grades.forEach((subject) => {
      if (subject.final.examGrade !== null) {
        const grade = subject.final.examGrade;
        const maxGrade = subject.final.finalDegree;

        totalExamGrades += grade;
        totalPossiblePoints += maxGrade;
        subjectsWithGrades++;

        if (grade > highestGrade.grade) {
          highestGrade = {
            subject: subject.subjectName,
            grade,
            semester: semesterData.semester,
            academicYear: `${semesterData.academicYear.startYear}-${semesterData.academicYear.endYear}`,
          };
        }

        if (grade < lowestGrade.grade && grade > 0) {
          lowestGrade = {
            subject: subject.subjectName,
            grade,
            semester: semesterData.semester,
            academicYear: `${semesterData.academicYear.startYear}-${semesterData.academicYear.endYear}`,
          };
        }

        if (!subjectPerformance[subject.subjectName]) {
          subjectPerformance[subject.subjectName] = [];
        }

        subjectPerformance[subject.subjectName].push({
          semester: semesterData.semester,
          academicYear: `${semesterData.academicYear.startYear}-${semesterData.academicYear.endYear}`,
          grade,
          maxGrade,
        });
      }

      if (subject.midterm.examGrade !== null) {
        if (!subjectPerformance[subject.subjectName]) {
          subjectPerformance[subject.subjectName] = [];
        }

        subjectPerformance[subject.subjectName].push({
          semester: semesterData.semester,
          academicYear: `${semesterData.academicYear.startYear}-${semesterData.academicYear.endYear}`,
          type: "midterm",
          grade: subject.midterm.examGrade,
          maxGrade: subject.midterm.finalDegree,
        });
      }
    });
  });

  const averageGrade =
    subjectsWithGrades > 0
      ? ((totalExamGrades / totalPossiblePoints) * 100).toFixed(2)
      : 0;

  return {
    studentId,
    semesterGrades: allGrades,
    statistics: {
      averageGrade: parseFloat(averageGrade),
      highestGrade: highestGrade.subject ? highestGrade : null,
      lowestGrade:
        lowestGrade.subject && lowestGrade.grade < 100 ? lowestGrade : null,
      totalSubjectsWithGrades: subjectsWithGrades,
    },
    subjectPerformance,
  };
};

module.exports = {
  getStudentSubjectGrades,
  getStudentCurrentSemesterGrades,
  getAllSemestersGrades,
  getStudentGradesReport,
};
