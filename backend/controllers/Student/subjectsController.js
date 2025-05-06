const expressAsyncHandler = require("express-async-handler");
const moment = require("moment");

const student = require("../../DB/StudentModel");
const GradeSubjectSemester = require("../../DB/GradeSubjectSemesterModel");
const GradeSubject = require("../../DB/GradeSubjectModel");
const Semester = require("../../DB/semesterModel");
const AcademicYear = require("../../DB/academicYearModel");

const getSubjectsAcademicYearAndGradeAndSemester = expressAsyncHandler(
  async (req, res) => {
    const studentId = req.user.id;

    const studentRecord = await student
      .findById(studentId)
      .populate("gradeId", "gradeName")
      .populate("academicYear_id", "startYear endYear");

    if (!studentRecord) {
      return res.status(404).json({
        status: 404,
        message: "Student not found",
      });
    }
    const currentYear = moment().year().toString().slice(-2);
    const currentMonth = moment().month() + 1;
    let startYear;
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
    const gradeId = studentRecord.gradeId._id;

    const gradeSubjectIds = await GradeSubject.find({
      gradeId,
      academicYear_id: academicYearId,
    }).distinct("_id");

    const gradeSubjectsSemesters = await GradeSubjectSemester.find({
      grade_subject_id: { $in: gradeSubjectIds },
      semester_id: semester._id,
    })
      .populate({
        path: "grade_subject_id",
        populate: [
          { path: "subjectId" },
          { path: "academicYear_id" },
          { path: "gradeId" },
        ],
      })
      .populate({
        path: "semester_id",
        populate: { path: "academicYear_id" },
      });

    const formattedResponse = gradeSubjectsSemesters.map((item) => ({
      id: item._id,
      subjectName: item.grade_subject_id.subjectId.subjectName,
      gradeName: item.grade_subject_id.gradeId.gradeName,
      academicYear: `${item.grade_subject_id.academicYear_id.startYear}-${item.grade_subject_id.academicYear_id.endYear}`,
      semesterName: item.semester_id.semesterName,
      updatedAt: item.updatedAt,
    }));

    res.status(200).json({
      status: 200,
      subjects: formattedResponse,
    });
  }
);

module.exports = getSubjectsAcademicYearAndGradeAndSemester;
