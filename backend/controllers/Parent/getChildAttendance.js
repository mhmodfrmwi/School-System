const expressAsyncHandler = require("express-async-handler");
const validateObjectId = require("../../utils/validateObjectId");
const moment = require("moment");

const attendanceValidationSchema = require("../../validations/attendanceValidation");
const Student = require("../../DB/StudentModel");
const Attendance = require("../../DB/attendanceModel");
const {
  getAttendance,
  getAbsences,
} = require("../../services/attendaceService");

const getStudentAttendanceUsingStudentId = expressAsyncHandler(
  async (req, res) => {
    const { studentId } = req.body;
    if (!validateObjectId(studentId)) {
      return res.status(400).json({
        status: 400,
        message: "Invalid Student ID",
      });
    }
    const studentAttendance = await getAttendance(studentId);
    res.status(200).json({
      status: 200,
      studentAttendance,
    });
  }
);

module.exports = {
  getStudentAttendanceUsingStudentId,
};
