const Attendance = require("../DB/attendenceModel");

const getAttendance = async (student_id) => {
  try {
    const attendance = await Attendance.find({ student_id });
    return attendance;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getNumberOfAbsentDays = async (student_id) => {
  try {
    const attendance = await Attendance.find({ student_id });
    const absentDays = attendance.filter(
      (attendance) => attendance.status === "A"
    );
    return absentDays.length;
  } catch (error) {
    throw new Error(error.message);
  }
};
module.exports = {
  getAttendance,
  getNumberOfAbsentDays,
};
