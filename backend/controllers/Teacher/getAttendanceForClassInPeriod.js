const expressAsyncHandler = require("express-async-handler");
const validateObjectId = require("../../utils/validateObjectId");
const moment = require("moment");
const Attendance = require("../../DB/attendanceModel");
const Class = require("../../DB/classModel");

const getAttendanceForClassInPeriod = expressAsyncHandler(async (req, res) => {
  try {
    const { classId, startDate, endDate } = req.body;

    if (!classId || !startDate || !endDate) {
      return res.status(400).json({
        status: 400,
        message: "Class ID, Start Date, and End Date are required",
      });
    }

    if (!validateObjectId(classId)) {
      return res.status(400).json({
        status: 400,
        message: "Invalid Class ID",
      });
    }
    const existingClass = await Class.findById(classId);
    if (!existingClass) {
      return res.status(404).json({
        status: 404,
        message: "Class not found",
      });
    }
    const startDateFormatted = moment(startDate, "DD-MM-YYYY")
      .startOf("day")
      .toDate();
    const endDateFormatted = moment(endDate, "DD-MM-YYYY")
      .endOf("day")
      .toDate();
    if (
      moment(startDateFormatted).isAfter(endDateFormatted) ||
      moment(endDateFormatted).isBefore(startDateFormatted)
    ) {
      return res.status(400).json({
        status: 400,
        message: "Invalid date range",
      });
    }
    let attendances = await Attendance.find({
      class_id: classId,
      date: { $gte: startDateFormatted, $lte: endDateFormatted },
    })
      .populate("student_id", "fullName")
      .populate("class_id", "className");
    res.status(200).json({
      status: 200,
      attendances,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: `Failed to fetch : ${error.message}` });
  }
});

module.exports = {
  getAttendanceForClassInPeriod,
};
