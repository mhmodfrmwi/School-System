const expressAsyncHandler = require("express-async-handler");
const validateObjectId = require("../../utils/validateObjectId");
const moment = require("moment");
const Attendance = require("../../DB/attendenceModel");

const getAttendanceForClassInPeriod = expressAsyncHandler(async (req, res) => {
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

  const startDateFormatted = moment(startDate, "DD-MM-YYYY")
    .startOf("day")
    .toDate();
  const endDateFormatted = moment(endDate, "DD-MM-YYYY").endOf("day").toDate();

  console.log(startDateFormatted, endDateFormatted);

  const attendances = await Attendance.find({
    class_id: classId,
    date: { $gte: startDateFormatted, $lte: endDateFormatted },
  });

  res.status(200).json({
    status: 200,
    attendances,
  });
});

module.exports = {
  getAttendanceForClassInPeriod,
};
