const expressAsyncHandler = require("express-async-handler");
const validateObjectId = require("../../utils/validateObjectId");
const addRewardClaimAndUpdatePoints = require("../../utils/updatingRewards");
const moment = require("moment");
const VirtualRoom = require("../../DB/virtualRoomModel");
const GradeSubjectSemester = require("../../DB/gradeSubjectSemester");
const AcademicYear = require("../../DB/academicYearModel");
const Student = require("../../DB/student");
const VirtualRoomAttendance = require("../../DB/virtualRoomAttendanceModel");

const handleVrLinkClick = expressAsyncHandler(async (req, res) => {
  const { virtualRoomId } = req.params;
  const studentId = req.user.id;

  if (!validateObjectId(virtualRoomId) || !validateObjectId(studentId)) {
    return res.status(400).json({
      status: 400,
      message: "Invalid virtual room ID or student ID.",
    });
  }

  try {
    const virtualRoom = await VirtualRoom.findById(virtualRoomId);
    if (!virtualRoom) {
      return res.status(404).json({
        status: 404,
        message: "Virtual room not found.",
      });
    }

    await virtualRoom.updateStatus();

    const now = moment().add(2, "hours");
    const startTime = moment(virtualRoom.startTime);
    const endTime = startTime.clone().add(virtualRoom.duration, "minutes");

    let attendance = await VirtualRoomAttendance.findOne({
      studentId,
      virtualRoomId,
    });

    let attendanceStatus;
    if (now.isBefore(startTime)) {
      attendanceStatus = "pending";
    } else if (now.isBetween(startTime, endTime)) {
      attendanceStatus = "attended";
      ///adding reward 
      addRewardClaimAndUpdatePoints(studentId,"Student","Attend VR");
    } else{
      if (attendance && attendance.status === "attended") {
        attendanceStatus = "attended";
      } else {
        console.log("hi")
        attendanceStatus = "missed";
      }
    } 

    if (attendance) {
      attendance.status = attendanceStatus;
    } else {
      attendance = new VirtualRoomAttendance({
        studentId,
        virtualRoomId,
        status: attendanceStatus,
      });
    }

    await attendance.save();

    res.status(200).json({
      status: 200,
      message: `Attendance marked as ${attendanceStatus}.`,
      attendance,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Failed to mark attendance.",
      error: error.message,
    });
  }
});
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
    const student = await Student.findById(studentId).select("gradeId classId");
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
      academicYearId: academic_year._id,
      classId,
    })
      .populate("subjectId", "subjectName")
      .populate("academicYearId", "academicYear")
      .populate("gradeId", "gradeName")
      .populate("semesterId", "semesterName")
      .populate("teacherId", "fullName");

    if (virtualRooms.length === 0) {
      return res.status(200).json({
        status: 200,
        message: "No virtual rooms found for this subject",
      });
    }

    for (const room of virtualRooms) {
      await room.updateStatus();
    }

    const attendanceRecords = await VirtualRoomAttendance.find({
      studentId,
      virtualRoomId: { $in: virtualRooms.map((room) => room._id) },
    });

    const virtualRoomsWithAttendance = virtualRooms.map((room) => {
      const attendance = attendanceRecords.find(
        (record) => record.virtualRoomId.toString() === room._id.toString()
      );

      let studentAttendanceStatus = "pending";
      if (attendance) {
        studentAttendanceStatus = attendance.status;
      } else if (room.status === "completed") {
        studentAttendanceStatus = "missed";
      }

      return {
        ...room.toObject(),
        ///////eman
        //startTime: moment.utc(room.startTime).format("YYYY-MM-DDTHH:mm:ss.SSS"),
        studentAttendanceStatus,
      };
    });

    res.status(200).json({
      status: 200,
      message: "Virtual rooms retrieved successfully.",
      virtualRooms: virtualRoomsWithAttendance,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Failed to retrieve virtual rooms.",
      error: error.message,
    });
  }
});
const getCompletedVirtualRooms = expressAsyncHandler(async (req, res) => {
  const studentId = req.user.id;
  const { gradeSubjectSemesterId } = req.params;

  if (!validateObjectId(studentId) || !validateObjectId(gradeSubjectSemesterId)) {
    return res.status(400).json({
      status: 400,
      message: "Invalid student ID or gradeSubjectSemester ID.",
    });
  }

  try {
    const student = await Student.findById(studentId).select("gradeId classId");
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
      academicYearId: academic_year._id,
      classId,
    })
      .populate("subjectId", "subjectName")
      .populate("academicYearId", "academicYear")
      .populate("gradeId", "gradeName")
      .populate("semesterId", "semesterName")
      .populate("teacherId", "fullName");

    if (virtualRooms.length === 0) {
      return res.status(200).json({
        status: 200,
        message: "No virtual rooms found for this subject.",
      });
    }

    for (const room of virtualRooms) {
      await room.updateStatus();
    }

    const completedVirtualRooms = virtualRooms.filter((room) => room.status === "completed");

    const attendanceRecords = await VirtualRoomAttendance.find({
      studentId,
      virtualRoomId: { $in: completedVirtualRooms.map((room) => room._id) },
    });

    const completedVirtualRoomsWithAttendance = completedVirtualRooms.map((room) => {
      const attendance = attendanceRecords.find(
        (record) => record.virtualRoomId.toString() === room._id.toString()
      );

      let studentAttendanceStatus = "pending";
      if (attendance) {
        studentAttendanceStatus = attendance.status;
      } else if (room.status === "completed") {
        studentAttendanceStatus = "missed";
      }

      return {
        ...room.toObject(),
        studentAttendanceStatus,
      };
    });

    res.status(200).json({
      status: 200,
      message: "Completed virtual rooms retrieved successfully.",
      virtualRooms: completedVirtualRoomsWithAttendance,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Failed to retrieve completed virtual rooms.",
      error: error.message,
    });
  }
});
const getMissedVirtualRooms = expressAsyncHandler(async (req, res) => {
  const studentId = req.user.id;
  const { gradeSubjectSemesterId } = req.params;

  if (!validateObjectId(studentId) || !validateObjectId(gradeSubjectSemesterId)) {
    return res.status(400).json({
      status: 400,
      message: "Invalid student ID or gradeSubjectSemester ID.",
    });
  }

  try {
    const student = await Student.findById(studentId).select("gradeId classId");
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
      academicYearId: academic_year._id,
      classId,
    })
      .populate("subjectId", "subjectName")
      .populate("academicYearId", "academicYear")
      .populate("gradeId", "gradeName")
      .populate("semesterId", "semesterName")
      .populate("teacherId", "fullName");

    if (virtualRooms.length === 0) {
      return res.status(200).json({
        status: 200,
        message: "No virtual rooms found for this subject.",
      });
    }

    for (const room of virtualRooms) {
      await room.updateStatus();
    }

    const completedVirtualRooms = virtualRooms.filter((room) => room.status === "completed");

    if (completedVirtualRooms.length === 0) {
      return res.status(200).json({
        status: 200,
        message: "No completed virtual rooms found.",
      });
    }

    const attendanceRecords = await VirtualRoomAttendance.find({
      studentId,
      virtualRoomId: { $in: completedVirtualRooms.map((room) => room._id) },
    });

    const missedVirtualRooms = completedVirtualRooms.filter((room) => {
      const attendance = attendanceRecords.find(
        (record) => record.virtualRoomId.toString() === room._id.toString()
      );

      return !attendance || attendance.status === "missed";
    });

    const missedVirtualRoomsWithDetails = missedVirtualRooms.map((room) => ({
      ...room.toObject(),
      studentAttendanceStatus: "missed",
    }));

    res.status(200).json({
      status: 200,
      message: "Missed virtual rooms retrieved successfully.",
      virtualRooms: missedVirtualRoomsWithDetails,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Failed to retrieve missed virtual rooms.",
      error: error.message,
    });
  }
});

module.exports = {
  getVirtualRoomsForStudent,
  handleVrLinkClick,
  getCompletedVirtualRooms,
  getMissedVirtualRooms,
};
//VirtualRoomAttendance