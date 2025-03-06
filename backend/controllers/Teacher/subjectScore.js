const expressAsyncHandler = require("express-async-handler");
const validateObjectId = require("../../utils/validateObjectId");
const moment = require("moment");
const xlsx = require("xlsx");
const Grade = require("../../DB/gradeModel");
const Student = require("../../DB/student");
const AcademicYear = require("../../DB/academicYearModel");
const Class = require("../../DB/classModel");
const Subject = require("../../DB/subjectModel");
const GradeSubjectSemester = require("../../DB/gradeSubjectSemester");
const Score = require("../../DB/scoreModel");
const SubjectScore = require("../../DB/subjectScoreModel");

const getGradeData = expressAsyncHandler(async (req, res) => {
  const { classId, gradeSubjectSemesterId } = req.params;

  if (!classId && !gradeSubjectSemesterId) {
    return res.status(400).json({
      status: 400,
      message: "Either classId or gradeSubjectSemesterId must be provided",
    });
  }

  if (classId && !validateObjectId(classId)) {
    return res.status(400).json({
      status: 400,
      message: "Invalid class ID format",
    });
  }

  if (gradeSubjectSemesterId && !validateObjectId(gradeSubjectSemesterId)) {
    return res.status(400).json({
      status: 400,
      message: "Invalid gradeSubjectSemester ID format",
    });
  }

  const currentYear = moment().year().toString().slice(-2);
  const currentMonth = moment().month() + 1;
  let startYear, endYear;
  
  if (currentMonth >= 9 && currentMonth <= 12) {
    startYear = `20${currentYear}`;
    endYear = `20${parseInt(currentYear) + 1}`;
  } else {
    startYear = `20${parseInt(currentYear) - 1}`;
    endYear = `20${currentYear}`;
  }

  const academicYear = await AcademicYear.findOne({ startYear, endYear });
  if (!academicYear) {
    return res.status(404).json({
      status: 404,
      message: "Current academic year not found",
    });
  }

  let grade;
  let students = [];
  let subject = null;

  if (classId) {
    const classInfo = await Class.findById(classId)
      .populate('gradeId')
      .lean();

    if (!classInfo) {
      return res.status(404).json({
        status: 404,
        message: "Class not found",
      });
    }

    grade = classInfo.gradeId;

    students = await Student.find({
      classId,
      academicYear_id: academicYear._id
    })
    .select("academic_number fullName admission_date -_id")
    .lean();
  }

  if (gradeSubjectSemesterId) {

    const gradeSubjectSemester = await GradeSubjectSemester.findById(gradeSubjectSemesterId)
      .populate({
        path: 'grade_subject_id',
        populate: {
          path: 'gradeId subjectId',
          select: 'gradeName level subjectName subjectCode'
        }
      })
      .lean();

    if (!gradeSubjectSemester) {
      return res.status(404).json({
        status: 404,
        message: "Grade subject semester not found",
      });
    }

    grade = gradeSubjectSemester.grade_subject_id.gradeId;

    subject = {
      subjectName: gradeSubjectSemester.grade_subject_id.subjectId.subjectName,
      semesterId: gradeSubjectSemester.semester_id
    };
  }

  const response = {
    grade: {
      _id: grade._id,
      gradeName: grade.gradeName,
      level: grade.level,
      academicYear: {
        startYear: academicYear.startYear,
        endYear: academicYear.endYear
      }
    },
    ...(subject && { subject }),
    ...(students.length > 0 && { students: students.map(student => ({
      academic_number: student.academic_number,
      fullName: student.fullName,
      admissionDate: student.admission_date
    })) })
  };

  return res.status(200).json({
    status: 200,
    message: "Grade data retrieved successfully",
    data: response
  });
});

const uploadGrades = expressAsyncHandler(async (req, res) => {
    const { classId, gradeSubjectSemesterId } = req.params;
  
    if (!validateObjectId(classId) || !validateObjectId(gradeSubjectSemesterId)) {
      return res.status(400).json({
        status: 400,
        message: "Invalid classId or gradeSubjectSemesterId",
      });
    }
  
    if (!req.file) {
      return res.status(400).json({
        status: 400,
        message: "No file uploaded",
      });
    }

    const workbook = xlsx.read(req.file.buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(sheet);
  
    const finalDegreeRow = data[data.length - 1];
    const finalDegree = finalDegreeRow.finalDegree;
  
    if (isNaN(finalDegree)) {
      return res.status(400).json({
        status: 400,
        message: "Invalid finalDegree value in the Excel sheet",
      });
    }
  
    // Remove the finalDegree row from the data
    data.pop();

    if (!data[0] || !data[0].academic_number || !data[0].fullName || !data[0].grade) {
      return res.status(400).json({
        status: 400,
        message: "Excel file must contain 'academic_number', 'fullName', and 'grade' columns",
      });
    }

    const currentYear = moment().year().toString().slice(-2);
    const currentMonth = moment().month() + 1;
    let startYear, endYear;
    
    if (currentMonth >= 9 && currentMonth <= 12) {
      startYear = `20${currentYear}`;
      endYear = `20${parseInt(currentYear) + 1}`;
    } else {
      startYear = `20${parseInt(currentYear) - 1}`;
      endYear = `20${currentYear}`;
    }

    const academicYear = await AcademicYear.findOne({ startYear, endYear });
    if (!academicYear) {
      return res.status(404).json({
        status: 404,
        message: "Current academic year not found",
      });
    }

    let subjectScore = await SubjectScore.findOne({ gradeSubjectSemesterId });

    // If it doesn't exist, create a new one
    if (!subjectScore) {
        subjectScore = new SubjectScore({
        gradeSubjectSemesterId,
        finalDegree,
        });
        await subjectScore.save();
    }

    const results = [];
    for (const row of data) {
      const { academic_number, fullName, grade } = row;

      if (isNaN(grade) || grade < 0 || grade > finalDegree) {
        results.push({
          academic_number,
          fullName,
          status: "Failed",
          message: `Invalid grade (must be between 0 and ${finalDegree})`,
        });
        continue;
      }

      const student = await Student.findOne({ academic_number });
      if (!student) {
        results.push({
          academic_number,
          fullName,
          status: "Failed",
          message: "Student not found",
        });
        continue;
      }

      const score = new Score({
        studentId: student._id,
        academicYearId: academicYear._id,
        classId,
        type: "final",
        examGrade: grade,
        subjectScoreId: subjectScore._id,
      });
      await score.save();
  
      results.push({
        academic_number,
        fullName,
        status: "Success",
        message: "Grade uploaded successfully",
        scoreId: score._id,
        subjectScoreId: subjectScore._id,
      });
    }
  
    return res.status(200).json({
      status: 200,
      message: "Grades processed successfully",
      results,
    });
});

module.exports = { 
    getGradeData,
    uploadGrades
 };