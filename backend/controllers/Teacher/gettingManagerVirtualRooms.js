const expressAsyncHandler = require("express-async-handler");
const validateObjectId = require("../../utils/validateObjectId");
const VirtualRoom = require("../../DB/virtualRoomManagerModel");
const VirtualRoomAttendance = require("../../DB/virtualRoomAttendanceManagerModel");
const AcademicYear = require("../../DB/academicYearModel");
const Semester = require("../../DB/semesterModel");
const moment = require("moment");

const calculateAcademicYearAndSemester = () => {
    const currentYear = moment().year().toString().slice(-2);
    const currentMonth = moment().month() + 1;
  
    let startYear, endYear;
    if (currentMonth >= 9 && currentMonth <= 12) {
      startYear = "20" + parseInt(currentYear);
      endYear = "20" + (parseInt(currentYear) + 1);
    } else {
      startYear = "20" + (parseInt(currentYear) - 1);
      endYear = "20" + parseInt(currentYear);
    }
  
    let semesterName;
    if (currentMonth >= 9 && currentMonth <= 12) {
      semesterName = "Semester 1";
    } else {
      semesterName = "Semester 2";
    }
  
    return { startYear, endYear, semesterName };
  };
const handleVrLinkClick = expressAsyncHandler(async (req, res) => {
  const { virtualRoomId } = req.params;
  const teacherId = req.user.id;

  if (!validateObjectId(virtualRoomId) || !validateObjectId(teacherId)) {
    return res.status(400).json({
      status: 400,
      message: "Invalid virtual room ID or teacher ID.",
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
      teacherId,
      virtualRoomId,
    });

    let attendanceStatus;
    if (now.isBefore(startTime)) {
      attendanceStatus = "pending";
    } else if (now.isBetween(startTime, endTime)) {
      attendanceStatus = "attended";
    } else {
      if (attendance && attendance.status === "attended") {
        attendanceStatus = "attended";
      } else {
        attendanceStatus = "missed";
      }
    }

    if (attendance) {
      attendance.status = attendanceStatus;
    } else {
      attendance = new VirtualRoomAttendance({
        teacherId,
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

const getVirtualRoomsForTeacher = expressAsyncHandler(async (req, res) => {
    const teacherId = req.user.id;
  
    if (!validateObjectId(teacherId)) {
      return res.status(400).json({
        status: 400,
        message: "Invalid teacher ID.",
      });
    }
  
    try {
      const { startYear, endYear, semesterName } = calculateAcademicYearAndSemester();

      const academicYear = await AcademicYear.findOne({ startYear, endYear });
      if (!academicYear) {
        return res.status(404).json({
          status: 404,
          message: "Academic year not found.",
        });
      }
  
      const semester = await Semester.findOne({
        semesterName,
        academicYear_id: academicYear._id,
      });
      if (!semester) {
        return res.status(404).json({
          status: 404,
          message: "Semester not found.",
        });
      }

      const virtualRooms = await VirtualRoom.find({
        academicYearId: academicYear._id,
        semesterId: semester._id,
      }).populate("managerId", "fullName");
  
      if (virtualRooms.length === 0) {
        return res.status(200).json({
          status: 200,
          message: "No virtual rooms found for the current academic year and semester.",
        });
      }

      for (const room of virtualRooms) {
        await room.updateStatus();
      }

      const attendanceRecords = await VirtualRoomAttendance.find({
        teacherId,
        virtualRoomId: { $in: virtualRooms.map((room) => room._id) },
      });

      const virtualRoomsWithAttendance = virtualRooms.map((room) => {
        const attendance = attendanceRecords.find(
          (record) => record.virtualRoomId.toString() === room._id.toString()
        );
  
        let teacherAttendanceStatus = "pending";
        if (attendance) {
          teacherAttendanceStatus = attendance.status;
        } else if (room.status === "completed") {
          teacherAttendanceStatus = "missed";
        }
  
        return {
          ...room.toObject(),
          teacherAttendanceStatus,
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
    const teacherId = req.user.id;
  
    if (!validateObjectId(teacherId)) {
      return res.status(400).json({
        status: 400,
        message: "Invalid teacher ID.",
      });
    }
  
    try {
      const { startYear, endYear, semesterName } = calculateAcademicYearAndSemester();

      const academicYear = await AcademicYear.findOne({ startYear, endYear });
      if (!academicYear) {
        return res.status(404).json({
          status: 404,
          message: "Academic year not found.",
        });
      }
  
      const semester = await Semester.findOne({
        semesterName,
        academicYear_id: academicYear._id,
      });
      if (!semester) {
        return res.status(404).json({
          status: 404,
          message: "Semester not found.",
        });
      }

      const virtualRooms = await VirtualRoom.find({
        academicYearId: academicYear._id,
        semesterId: semester._id,
        status: "completed",
      }).populate("managerId", "fullName");
  
      if (virtualRooms.length === 0) {
        return res.status(200).json({
          status: 200,
          message: "No completed virtual rooms found.",
        });
      }

      const attendanceRecords = await VirtualRoomAttendance.find({
        teacherId,
        virtualRoomId: { $in: virtualRooms.map((room) => room._id) },
      });

      const completedVirtualRoomsWithAttendance = virtualRooms.map((room) => {
        const attendance = attendanceRecords.find(
          (record) => record.virtualRoomId.toString() === room._id.toString()
        );
  
        let teacherAttendanceStatus = "pending";
        if (attendance) {
          teacherAttendanceStatus = attendance.status;
        } else {
          teacherAttendanceStatus = "missed";
        }
  
        return {
          ...room.toObject(),
          teacherAttendanceStatus,
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
    const teacherId = req.user.id;
  
    if (!validateObjectId(teacherId)) {
      return res.status(400).json({
        status: 400,
        message: "Invalid teacher ID.",
      });
    }
  
    try {
      const { startYear, endYear, semesterName } = calculateAcademicYearAndSemester();

      const academicYear = await AcademicYear.findOne({ startYear, endYear });
      if (!academicYear) {
        return res.status(404).json({
          status: 404,
          message: "Academic year not found.",
        });
      }
  
      const semester = await Semester.findOne({
        semesterName,
        academicYear_id: academicYear._id,
      });
      if (!semester) {
        return res.status(404).json({
          status: 404,
          message: "Semester not found.",
        });
      }

      const virtualRooms = await VirtualRoom.find({
        academicYearId: academicYear._id,
        semesterId: semester._id,
        status: "completed",
      }).populate("managerId", "fullName");
  
      if (virtualRooms.length === 0) {
        return res.status(200).json({
          status: 200,
          message: "No completed virtual rooms found.",
        });
      }

      const attendanceRecords = await VirtualRoomAttendance.find({
        teacherId,
        virtualRoomId: { $in: virtualRooms.map((room) => room._id) },
      });

      const missedVirtualRooms = virtualRooms.filter((room) => {
        const attendance = attendanceRecords.find(
          (record) => record.virtualRoomId.toString() === room._id.toString()
        );
        return !attendance || attendance.status === "missed";
      });
  
      if (missedVirtualRooms.length === 0) {
        return res.status(200).json({
          status: 200,
          message: "No missed virtual rooms found.",
        });
      }

      const missedVirtualRoomsWithDetails = missedVirtualRooms.map((room) => ({
        ...room.toObject(),
        teacherAttendanceStatus: "missed",
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
  handleVrLinkClick,
  getVirtualRoomsForTeacher,
  getCompletedVirtualRooms,
  getMissedVirtualRooms
};