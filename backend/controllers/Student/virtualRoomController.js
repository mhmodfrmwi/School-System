const expressAsyncHandler = require("express-async-handler");
const validateObjectId = require("../../utils/validateObjectId");
const moment = require("moment");
const VirtualRoom = require("../../DB/virtualRoomModel");
const GradeSubjectSemester = require("../../DB/gradeSubjectSemester");
const AcademicYear = require("../../DB/academicYearModel");
const Student = require("../../DB/student");

const getVirtualRoomsForStudent = expressAsyncHandler(async (req, res) => {
  const studentId = req.user.id;
  const { gradeSubjectSemesterId } = req.params;

  if (!validateObjectId(studentId) || !validateObjectId(gradeSubjectSemesterId)) {
    return res.status(400).json({
      status: 400,
      message: "Invalid student ID or gradeSubjectSemester ID.",
    });
  }

  try {
    const student = await Student.findById(studentId).select("gradeId");
    if (!student) {
      return res.status(404).json({
        status: 404,
        message: "Student not found.",
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

    const academic_year = await AcademicYear.findOne({ startYear, endYear });
    if (!academic_year) {
      return res.status(404).json({
        status: 404,
        message: "Academic year not found",
      });
    }
    const gradeId = student.gradeId;

    const classId = student.classId;

    const gradeSubjectSemester = await GradeSubjectSemester.findById(gradeSubjectSemesterId)
      .populate({
        path: "grade_subject_id",
        populate: { path: "subjectId", select: "_id" },

      })
      .populate("semester_id", "_id");

    if (!gradeSubjectSemester) {
      return res.status(404).json({
        status: 404,
        message: "GradeSubjectSemester not found.",
      });
    }

    const subjectId = gradeSubjectSemester.grade_subject_id.subjectId._id;
    const semesterId = gradeSubjectSemester.semester_id._id;

    const virtualRooms = await VirtualRoom.find({
      subjectId,
      gradeId,
      semesterId,
      academicYearId:academic_year._id,
      classId,
    })
      .populate("subjectId", "subjectName")
      .populate("academicYearId", "academicYear")
      .populate("gradeId", "gradeName")
      .populate("semesterId", "semesterName")
      .populate("teacherId","fullName");

    if (virtualRooms.length === 0) {
      return res.status(404).json({
        status: 404,
        message:
          "No virtual rooms found for this subject",
      });
    }

    res.status(200).json({
      status: 200,
      message: "Virtual rooms retrieved successfully.",
      virtualRooms,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Failed to retrieve virtual rooms.",
      error: error.message,
    });
  }
});
module.exports = {
  getVirtualRoomsForStudent,
};