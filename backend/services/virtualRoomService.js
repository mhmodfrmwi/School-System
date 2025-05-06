const moment = require("moment");
const VirtualRoom = require("../DB/virtualRoomModel");
const GradeSubjectSemester = require("../DB/GradeSubjectSemesterModel");
const AcademicYear = require("../DB/academicYearModel");
const Student = require("../DB/StudentModel");
const VirtualRoomAttendance = require("../DB/virtualRoomAttendanceModel");
const addRewardClaimAndUpdatePoints = require("../utils/updatingRewards");

const handleVrLinkClick = async (virtualRoomId, studentId) => {
  const virtualRoom = await VirtualRoom.findById(virtualRoomId);
  if (!virtualRoom) {
    throw new Error("Virtual room not found.");
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
    await addRewardClaimAndUpdatePoints(studentId, "Student", "Attend VR");
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
      studentId,
      virtualRoomId,
      status: attendanceStatus,
    });
  }

  await attendance.save();

  return {
    status: 200,
    message: `Attendance marked as ${attendanceStatus}.`,
    attendance,
  };
};

const getAcademicYear = async () => {
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

  const academicYear = await AcademicYear.findOne({ startYear, endYear });
  if (!academicYear) {
    throw new Error("Academic year not found");
  }
  return academicYear;
};

const getVirtualRoomsForStudent = async (studentId, gradeSubjectSemesterId) => {
  const student = await Student.findById(studentId).select("gradeId classId");
  if (!student) {
    throw new Error("Student not found.");
  }

  const academicYear = await getAcademicYear();
  const gradeId = student.gradeId;
  const classId = student.classId;

  const gradeSubjectSemester = await GradeSubjectSemester.findById(
    gradeSubjectSemesterId
  )
    .populate({
      path: "grade_subject_id",
      populate: { path: "subjectId", select: "_id" },
    })
    .populate("semester_id", "_id");

  if (!gradeSubjectSemester) {
    throw new Error("GradeSubjectSemester not found.");
  }

  const subjectId = gradeSubjectSemester.grade_subject_id.subjectId._id;
  const semesterId = gradeSubjectSemester.semester_id._id;

  const virtualRooms = await VirtualRoom.find({
    subjectId,
    gradeId,
    semesterId,
    academicYearId: academicYear._id,
    classId,
  })
    .populate("subjectId", "subjectName")
    .populate("academicYearId", "academicYear")
    .populate("gradeId", "gradeName")
    .populate("semesterId", "semesterName")
    .populate("teacherId", "fullName");

  if (virtualRooms.length === 0) {
    return {
      status: 200,
      message: "No virtual rooms found for this subject",
      virtualRooms: [],
    };
  }

  await Promise.all(virtualRooms.map((room) => room.updateStatus()));

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
      studentAttendanceStatus,
    };
  });

  return {
    status: 200,
    message: "Virtual rooms retrieved successfully.",
    virtualRooms: virtualRoomsWithAttendance,
  };
};

const getCompletedVirtualRooms = async (studentId, gradeSubjectSemesterId) => {
  const result = await getVirtualRoomsForStudent(
    studentId,
    gradeSubjectSemesterId
  );

  const completedVirtualRooms = result.virtualRooms.filter(
    (room) => room.status === "completed"
  );

  return {
    status: 200,
    message: "Completed virtual rooms retrieved successfully.",
    virtualRooms: completedVirtualRooms,
  };
};

const getMissedVirtualRooms = async (studentId, gradeSubjectSemesterId) => {
  const result = await getVirtualRoomsForStudent(
    studentId,
    gradeSubjectSemesterId
  );

  const completedVirtualRooms = result.virtualRooms.filter(
    (room) => room.status === "completed"
  );

  if (completedVirtualRooms.length === 0) {
    return {
      status: 200,
      message: "No completed virtual rooms found.",
      virtualRooms: [],
    };
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

  return {
    status: 200,
    message: "Missed virtual rooms retrieved successfully.",
    virtualRooms: missedVirtualRoomsWithDetails,
  };
};
const getAllMissedVirtualRoomsForAllSubjects = async (studentId) => {
  const student = await Student.findById(studentId).select("gradeId classId");
  if (!student) {
    throw new Error("Student not found.");
  }

  const academicYear = await getAcademicYear();
  const gradeId = student.gradeId;
  const classId = student.classId;

  const virtualRooms = await VirtualRoom.find({
    gradeId,
    academicYearId: academicYear._id,
    classId,
  })
    .populate("subjectId", "subjectName")
    .populate("academicYearId", "academicYear")
    .populate("gradeId", "gradeName")
    .populate("semesterId", "semesterName")
    .populate("teacherId", "fullName");

  if (virtualRooms.length === 0) {
    return {
      status: 200,
      message: "No virtual rooms found for this student.",
      virtualRooms: [],
    };
  }

  await Promise.all(virtualRooms.map((room) => room.updateStatus()));

  const completedVirtualRooms = virtualRooms.filter(
    (room) => room.status === "completed"
  );

  if (completedVirtualRooms.length === 0) {
    return {
      status: 200,
      message: "No completed virtual rooms found.",
      virtualRooms: [],
    };
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

  const missedRoomsBySubject = {};
  missedVirtualRoomsWithDetails.forEach((room) => {
    const subjectName = room.subjectId.subjectName;
    if (!missedRoomsBySubject[subjectName]) {
      missedRoomsBySubject[subjectName] = [];
    }
    missedRoomsBySubject[subjectName].push(room);
  });

  return {
    status: 200,
    message: "Missed virtual rooms retrieved successfully.",
    totalMissed: missedVirtualRoomsWithDetails.length,
    bySubject: missedRoomsBySubject,
    allMissedRooms: missedVirtualRoomsWithDetails,
  };
};

const getAllCompletedVirtualRoomsForAllSubjects = async (studentId) => {
  // Get student information
  const student = await Student.findById(studentId).select("gradeId classId");
  if (!student) {
    throw new Error("Student not found.");
  }

  // Get current academic year
  const academicYear = await getAcademicYear();
  const gradeId = student.gradeId;
  const classId = student.classId;

  // Find all virtual rooms for the student's grade and class in current academic year
  const virtualRooms = await VirtualRoom.find({
    gradeId,
    academicYearId: academicYear._id,
    classId,
  })
    .populate("subjectId", "subjectName")
    .populate("academicYearId", "academicYear")
    .populate("gradeId", "gradeName")
    .populate("semesterId", "semesterName")
    .populate("teacherId", "fullName");

  if (virtualRooms.length === 0) {
    return {
      status: 200,
      message: "No virtual rooms found for this student.",
      virtualRooms: [],
    };
  }

  // Update status for all rooms
  await Promise.all(virtualRooms.map((room) => room.updateStatus()));

  // Filter only completed rooms
  const completedVirtualRooms = virtualRooms.filter(
    (room) => room.status === "completed"
  );

  if (completedVirtualRooms.length === 0) {
    return {
      status: 200,
      message: "No completed virtual rooms found.",
      virtualRooms: [],
    };
  }

  // Get attendance records for these rooms
  const attendanceRecords = await VirtualRoomAttendance.find({
    studentId,
    virtualRoomId: { $in: completedVirtualRooms.map((room) => room._id) },
  });

  // Add attendance status to each room
  const completedRoomsWithAttendance = completedVirtualRooms.map((room) => {
    const attendance = attendanceRecords.find(
      (record) => record.virtualRoomId.toString() === room._id.toString()
    );

    return {
      ...room.toObject(),
      studentAttendanceStatus: attendance ? attendance.status : "missed",
    };
  });

  // Group by subject for better organization
  const completedRoomsBySubject = {};
  completedRoomsWithAttendance.forEach((room) => {
    const subjectName = room.subjectId.subjectName;
    if (!completedRoomsBySubject[subjectName]) {
      completedRoomsBySubject[subjectName] = [];
    }
    completedRoomsBySubject[subjectName].push(room);
  });

  return {
    totalCount: completedRoomsWithAttendance.length,
    attendedCount: completedRoomsWithAttendance.filter(
      (room) => room.studentAttendanceStatus === "attended"
    ).length,
    missedCount: completedRoomsWithAttendance.filter(
      (room) => room.studentAttendanceStatus === "missed"
    ).length,
    pendingCount: completedRoomsWithAttendance.filter(
      (room) => room.studentAttendanceStatus === "pending"
    ).length,
    attendancePercentage:
      (completedRoomsWithAttendance.filter(
        (room) => room.studentAttendanceStatus === "attended"
      ).length /
        completedRoomsWithAttendance.length) *
        100 || 0,
  };
};
module.exports = {
  handleVrLinkClick,
  getVirtualRoomsForStudent,
  getCompletedVirtualRooms,
  getMissedVirtualRooms,
  getAllMissedVirtualRoomsForAllSubjects,
  getAllCompletedVirtualRoomsForAllSubjects,
};
