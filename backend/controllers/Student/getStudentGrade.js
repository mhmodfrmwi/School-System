const expressAsyncHandler = require('express-async-handler');
const Score = require('../../DB/scoreModel');
const SubjectScore = require('../../DB/subjectScoreModel');
const Student = require('../../DB/student');
const AcademicYear = require('../../DB/academicYearModel');
const Semester = require('../../DB/semesterModel');
const moment = require('moment');

const getStudentGrades = expressAsyncHandler(async (req, res) => {
  const { subjectId } = req.params;
  const studentId = req.user.id;
  try {
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: 'Student not found.' });
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
        message: 'Academic year not found.',
      });
    }
    const academicYearId = academic_year._id;

    const semester = await Semester.findOne({
      semesterName: semester_name,
      academicYear_id: academicYearId,
    });
    if (!semester) {
      return res.status(404).json({
        message: 'Semester not found in the given academic year.',
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
        message: 'No subject scores found for the given subject, grade, and semester.',
      });
    }

    const grades = await Promise.all(
      subjectScores.map(async (subjectScore) => {
        const studentGrades = await Score.find({
          studentId,
          subjectScoreId: subjectScore._id,
        });

        const midtermGrade = studentGrades.find((grade) => grade.type === 'midterm');
        const finalGrade = studentGrades.find((grade) => grade.type === 'final');

        return {
          subjectScoreId: subjectScore._id,
          midterm: {
            examGrade: midtermGrade ? midtermGrade.examGrade : null,
            finalDegree: subjectScore.finalDegree,
          },
          final: {
            examGrade: finalGrade ? finalGrade.examGrade : null,
            finalDegree: subjectScore.finalDegree,
          },
        };
      })
    );

    const response = {
      subjectId,
      gradeId,
      semesterId,
      grades,
    };

    res.status(200).json(response);
  } catch (error) {
    console.error('Error fetching student grades:', error);
    res.status(500).json({ message: 'Error fetching student grades.', error: error.message });
  }
});

module.exports = { getStudentGrades };