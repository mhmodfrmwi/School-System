const expressAsyncHandler = require("express-async-handler");
const Score = require("../../DB/scoreModel");
const SubjectScore = require("../../DB/subjectScoreModel");
const Student = require("../../DB/StudentModel");
const AcademicYear = require("../../DB/academicYearModel");
const Semester = require("../../DB/semesterModel");
const GradeSubject = require("../../DB/GradeSubjectModel");
const GradeSubjectSemester = require("../../DB/GradeSubjectSemesterModel");
const Subject = require("../../DB/subjectModel");
const moment = require("moment");

const getStudentGrades = expressAsyncHandler(async (req, res) => {
  const { subjectId } = req.params;
  const studentId = req.user.id;

  try {
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: "Student not found." });
    }

    const gradeId = student.gradeId;

    const currentYear = moment().year().toString().slice(-2);
    const currentMonth = moment().month() + 1;
    let startYear;
    let endYear;

    if (currentMonth >= 9 && currentMonth <= 12) {
      startYear = "20" + parseInt(currentYear);
      endYear = "20" + (parseInt(currentYear) + 1);
    } else {
      startYear = "20" + (parseInt(currentYear) - 1);
      endYear = "20" + parseInt(currentYear);
    }

    let semester_name;
    if (currentMonth >= 9 && currentMonth <= 12) {
      semester_name = "Semester 1";
    } else {
      semester_name = "Semester 2";
    }

    const academic_year = await AcademicYear.findOne({ startYear, endYear });
    if (!academic_year) {
      return res.status(404).json({
        message: "Academic year not found.",
      });
    }
    const academicYearId = academic_year._id;

    const semester = await Semester.findOne({
      semesterName: semester_name,
      academicYear_id: academicYearId,
    });
    if (!semester) {
      return res.status(404).json({
        message: "Semester not found in the given academic year.",
      });
    }
    const semesterId = semester._id;

    const subjectScores = await SubjectScore.find({
      subjectId,
      gradeId,
      semesterId,
    });

    if (!subjectScores.length) {
      return res.status(404).json({
        message:
          "No subject scores found for the given subject, grade, and semester.",
      });
    }

    const grades = await Promise.all(
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

    const midtermData = grades.find((grade) => grade.type === "midterm");
    const finalData = grades.find((grade) => grade.type === "final");

    const response = {
      subjectId,
      gradeId,
      semesterId,
      midterm: midtermData || { examGrade: null, finalDegree: null }, // Midterm data
      final: finalData || { examGrade: null, finalDegree: null }, // Final data
    };

    res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching student grades:", error);
    res.status(500).json({
      message: "Error fetching student grades.",
      error: error.message,
    });
  }
});

const getStudentSemesterGrades = expressAsyncHandler(async (req, res) => {
  const studentId = req.user.id;

  try {
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: "Student not found." });
    }

    const gradeId = student.gradeId;

    const currentYear = moment().year().toString().slice(-2);
    const currentMonth = moment().month() + 1;
    let startYear;
    let endYear;

    if (currentMonth >= 9 && currentMonth <= 12) {
      startYear = "20" + parseInt(currentYear);
      endYear = "20" + (parseInt(currentYear) + 1);
    } else {
      startYear = "20" + (parseInt(currentYear) - 1);
      endYear = "20" + parseInt(currentYear);
    }

    let semester_name;
    if (currentMonth >= 9 && currentMonth <= 12) {
      semester_name = "Semester 1";
    } else {
      semester_name = "Semester 2";
    }

    const academic_year = await AcademicYear.findOne({ startYear, endYear });
    if (!academic_year) {
      return res.status(404).json({
        message: "Academic year not found.",
      });
    }
    const academicYearId = academic_year._id;

    const semester = await Semester.findOne({
      semesterName: semester_name,
      academicYear_id: academicYearId,
    });
    if (!semester) {
      return res.status(404).json({
        message: "Semester not found in the given academic year.",
      });
    }
    const semesterId = semester._id;

    const gradeSubjects = await GradeSubject.find({
      gradeId,
      academicYear_id: academicYearId,
    }).populate("subjectId");
    if (!gradeSubjects.length) {
      return res.status(404).json({
        message: "No subjects found for the given grade and academic year.",
      });
    }

    const gradeSubjectSemesters = await GradeSubjectSemester.find({
      grade_subject_id: { $in: gradeSubjects.map((gs) => gs._id) },
      semester_id: semesterId,
    });
    if (!gradeSubjectSemesters.length) {
      return res.status(404).json({
        message: "No subjects found for the current semester.",
      });
    }

    const subjectIds = gradeSubjectSemesters.map(
      (gss) =>
        gradeSubjects.find((gs) => gs._id.equals(gss.grade_subject_id))
          .subjectId
    );
    const subjects = await Subject.find({ _id: { $in: subjectIds } });
    if (!subjects.length) {
      return res.status(404).json({
        message: "No subjects found for the given grade and semester.",
      });
    }

    const grades = await Promise.all(
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

    res.status(200).json(grades);
  } catch (error) {
    console.error("Error fetching student grades:", error);
    res.status(500).json({
      message: "Error fetching student grades.",
      error: error.message,
    });
  }
});

const getAllSemesterGrades = expressAsyncHandler(async (req, res) => {
  const studentId = req.user.id;

  try {
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: "Student not found." });
    }

    const gradeId = student.gradeId;

    const academicYears = await AcademicYear.find().sort({ startYear: 1 });
    if (!academicYears.length) {
      return res.status(404).json({ message: "No academic years found." });
    }

    const semesters = await Semester.find({
      academicYear_id: { $in: academicYears.map((ay) => ay._id) },
    }).sort({ semesterName: 1 });

    if (!semesters.length) {
      return res.status(404).json({ message: "No semesters found." });
    }

    const gradeSubjects = await GradeSubject.find({ gradeId }).populate(
      "subjectId"
    );
    if (!gradeSubjects.length) {
      return res.status(404).json({
        message: "No subjects found for the given grade.",
      });
    }

    const gradeSubjectSemesters = await GradeSubjectSemester.find({
      grade_subject_id: { $in: gradeSubjects.map((gs) => gs._id) },
      semester_id: { $in: semesters.map((s) => s._id) },
    });
    if (!gradeSubjectSemesters.length) {
      return res.status(404).json({
        message: "No subjects found for the given semesters.",
      });
    }

    const subjectIds = gradeSubjectSemesters.map(
      (gss) =>
        gradeSubjects.find((gs) => gs._id.equals(gss.grade_subject_id))
          .subjectId
    );
    const subjects = await Subject.find({ _id: { $in: subjectIds } });
    if (!subjects.length) {
      return res.status(404).json({
        message: "No subjects found for the given grade and semesters.",
      });
    }

    const subjectMap = subjects.reduce((map, subject) => {
      map[subject._id] = subject.name;
      return map;
    }, {});

    const results = await Promise.all(
      semesters.map(async (semester) => {
        const subjectScores = await SubjectScore.find({
          semesterId: semester._id,
          gradeId,
        }).populate("subjectId");

        const semesterGrades = await Promise.all(
          subjectScores.map(async (subjectScore) => {
            const studentGrades = await Score.find({
              studentId,
              subjectScoreId: subjectScore._id,
            });

            return {
              subjectId: subjectScore.subjectId,
              subjectName: subjectScore.subjectId.subjectName,
              type: subjectScore.type,
              examGrade:
                studentGrades.length > 0 ? studentGrades[0].examGrade : null,
              finalDegree: subjectScore.finalDegree,
            };
          })
        );

        const groupedGrades = semesterGrades.reduce((acc, grade) => {
          if (!acc[grade.subjectId]) {
            acc[grade.subjectId] = {
              subjectId: grade.subjectId,
              subjectName: grade.subjectName,
              midterm: { examGrade: null, finalDegree: null },
              final: { examGrade: null, finalDegree: null },
            };
          }

          if (grade.type === "midterm") {
            acc[grade.subjectId].midterm = {
              examGrade: grade.examGrade,
              finalDegree: grade.finalDegree,
            };
          } else if (grade.type === "final") {
            acc[grade.subjectId].final = {
              examGrade: grade.examGrade,
              finalDegree: grade.finalDegree,
            };
          }

          return acc;
        }, {});

        return {
          academicYear: academicYears.find((ay) =>
            ay._id.equals(semester.academicYear_id)
          ),
          semester: semester.semesterName,
          grades: Object.values(groupedGrades),
        };
      })
    );

    res.status(200).json(results);
  } catch (error) {
    console.error("Error fetching all semester grades:", error);
    res.status(500).json({
      message: "Error fetching all semester grades.",
      error: error.message,
    });
  }
});

module.exports = {
  getStudentGrades,
  getStudentSemesterGrades,
  getAllSemesterGrades,
};
