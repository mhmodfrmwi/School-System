const expressAsyncHandler = require("express-async-handler");
const student = require("../../DB/student");
const GradeSubjectSemester = require("../../DB/gradeSubjectSemester");
const GradeSubject = require("../../DB/gradeSubject");
const Semester = require("../../DB/semesterModel");

const getSubjectsAcademicYearAndGradeAndSemester = expressAsyncHandler(
  async (req, res) => {
    const studentId = req.user.id;
    const semesterName = req.body.semester;

    if (!semesterName) {
      return res.status(400).json({
        status: 400,
        message: "Semester is required",
      });
    }

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

    const { gradeId, academicYear_id: academicYearId } = studentRecord;

    const semester = await Semester.findOne({
      semesterName,
      academicYear_id: academicYearId,
    });

    if (!semester) {
      return res.status(404).json({
        status: 404,
        message: "Semester not found in the given academic year",
      });
    }

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
