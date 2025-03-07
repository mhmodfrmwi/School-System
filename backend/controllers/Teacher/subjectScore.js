const expressAsyncHandler = require("express-async-handler");
const validateObjectId = require("../../utils/validateObjectId");
const moment = require("moment");
const xlsx = require("xlsx");
const fs = require("fs");
const Grade = require("../../DB/gradeModel");
const Student = require("../../DB/student");
const AcademicYear = require("../../DB/academicYearModel");
const Class = require("../../DB/classModel");
const Subject = require("../../DB/subjectModel");
const GradeSubjectSemester = require("../../DB/gradeSubjectSemester");
const Semester = require("../../DB/semesterModel")
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
      academicYear_id: academicYear._id,
    })
      .select("academic_number fullName admission_date -_id")
      .lean();
  }

  if (gradeSubjectSemesterId) {
    const gradeSubjectSemester = await GradeSubjectSemester.findById(
      gradeSubjectSemesterId
    )
      .populate({
        path: "grade_subject_id",
        populate: {
          path: "gradeId subjectId",
          select: "gradeName level subjectName subjectCode",
        },
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
      semesterId: gradeSubjectSemester.semester_id,
    };
  }

  const response = {
    grade: {
      _id: grade._id,
      gradeName: grade.gradeName,
      level: grade.level,
      academicYear: {
        startYear: academicYear.startYear,
        endYear: academicYear.endYear,
      },
    },
    ...(subject && { subject }),
    ...(students.length > 0 && {
      students: students.map((student) => ({
        academic_number: student.academic_number,
        fullName: student.fullName,
        admissionDate: student.admission_date,
      })),
    }),
  };

  return res.status(200).json({
    status: 200,
    message: "Grade data retrieved successfully",
    data: response,
  });
});

const uploadScoresFromExcel1 = expressAsyncHandler(async (req, res) => {
  const { classId, gradeSubjectSemesterId } = req.params;
  const file = req.file;

  if (!file) {
    return res.status(400).json({ message: "No file uploaded." });
  }

  try {
    const workbook = xlsx.readFile(file.path);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    const type = sheet["B1"]?.v;
    const finalDegree = sheet["B2"]?.v;

    if (!type || !finalDegree) {
      return res
        .status(400)
        .json({ message: "File is missing type or finalDegree." });
    }

    const data = xlsx.utils.sheet_to_json(sheet, { range: 2 });

    if (!data.length) {
      return res
        .status(400)
        .json({ message: "File contains no student data." });
    }

    for (const row of data) {
      const { academic_number, fullName, examGrade } = row;

      if (!academic_number || !fullName || !examGrade) {
        console.warn("Invalid file format or missing data.");
        continue;
      }

      const student = await Student.findOne({ academic_number });
      if (!student) {
        console.warn(`Student ${fullName} (${academic_number}) not found.`);
        continue;
      }

      let subjectScore = await SubjectScore.findOne({ gradeSubjectSemesterId });
      if (!subjectScore) {
        subjectScore = new SubjectScore({
          gradeSubjectSemesterId,
          finalDegree,
        });
        await subjectScore.save();
      }

      const score = new Score({
        studentId: student._id,
        academicYearId: student.academicYear_id,
        classId,
        type,
        examGrade,
        subjectScoreId: subjectScore._id,
      });

      await score.save();
    }
    fs.unlinkSync(file.path);
    res.status(200).json({ message: "Data uploaded successfully." });
  } catch (error) {
    if (file) {
      fs.unlinkSync(file.path);
    }
    console.error("Error uploading data:", error);
    res.status(500).json({ message: "Error uploading data." });
  }
});
const uploadScoresFromExcel = expressAsyncHandler(async (req, res) => {
    const { classId, gradeSubjectSemesterId } = req.params;
    const file = req.file;
  
    if (!file) {
      return res.status(400).json({status:400, message: "No file uploaded." });
    }
  
    try {
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
          status: 404,
          message: "Academic year not found",
        });
      }
      const academicYearId = academic_year._id;

      const semester = await Semester.findOne({
        semesterName: semester_name,
        academicYear_id: academicYearId,
      });
      if (!semester) {
        return res.status(404).json({
          status: 404,
          message: "Semester not found in the given academic year",
        });
      }
      const semesterId = semester._id;

      const gradeSubjectSemester = await GradeSubjectSemester.findById(gradeSubjectSemesterId)
        .populate('grade_subject_id');
  
      if (!gradeSubjectSemester) {
        return res.status(404).json({
          status: 404,
          message: "GradeSubjectSemester not found",
        });
      }

      const gradeId = gradeSubjectSemester.grade_subject_id.gradeId;
      const subjectId = gradeSubjectSemester.grade_subject_id.subjectId;

      const workbook = xlsx.readFile(file.path);
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
  
      const type = sheet["B1"]?.v;
      const finalDegree = sheet["B2"]?.v;
  
      if (!type || !finalDegree) {
        return res
          .status(400)
          .json({status:400, message: "File is missing type or finalDegree." });
      }

      const data = xlsx.utils.sheet_to_json(sheet, { range: 2 });
  
      if (!data.length) {
        return res
          .status(400)
          .json({status:400, message: "File contains no student data." });
      }
  
      for (const row of data) {
        const { academic_number, fullName, examGrade } = row;
  
        if (!academic_number || !fullName || !examGrade) {
          console.warn("Invalid file format or missing data.");
          continue;
        }

        const student = await Student.findOne({ academic_number });
        if (!student) {
          console.warn(`Student ${fullName} (${academic_number}) not found.`);
          continue;
        }

        let subjectScore = await SubjectScore.findOne({
          gradeId,
          subjectId,
          semesterId,
        });
        if (!subjectScore) {
          subjectScore = new SubjectScore({
            gradeId,
            subjectId,
            semesterId,
            finalDegree,
          });
          await subjectScore.save();
        }

        const score = new Score({
          studentId: student._id,
          academicYearId: student.academicYear_id,
          classId,
          type,
          examGrade,
          subjectScoreId: subjectScore._id,
        });
  
        await score.save();
      }

      fs.unlinkSync(file.path);
  
      res.status(200).json({
        status:200,
        message: "Data uploaded successfully." });
    } catch (error) {
      if (file) {
        fs.unlinkSync(file.path);
      }
      console.error("Error uploading data:", error);
      res.status(500).json({ status:500, message: "Error uploading data.", error: error.message });
    }
});
module.exports = {
  getGradeData,
  uploadScoresFromExcel,
};
