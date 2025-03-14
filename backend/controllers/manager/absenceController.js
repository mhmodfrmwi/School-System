const Class = require("../../DB/classModel");
const Attendance = require("../../DB/attendenceModel");
const validateObjectId = require("../../utils/validateObjectId");
const moment = require("moment");
const FetchClasses = async (req, res) => {
  try {
    const classes = await Class.find()
      .populate("gradeId", "gradeName")
      .select("-createdAt -updatedAt -__v");
    classes.sort((a, b) => {
      const gradeCompare = a.gradeId.gradeName.localeCompare(
        b.gradeId.gradeName
      );
      if (gradeCompare !== 0) return gradeCompare;
      return a.className.localeCompare(b.className);
    });

    res.status(200).json(classes);
  } catch (error) {
    console.log(error.message);
    res.json({ message: `Failed to fetch classes : ${error.message}` });
  }
};
const FetchAbsenceForClassInDay = async (req, res) => {
  try {
    const { classId, date } = req.body;

    if (!classId || !date) {
      return res.status(400).json({
        status: 400,
        message: "Class ID and Date are required",
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
    const startDateFormatted = moment(date, "DD-MM-YYYY")
      .startOf("day")
      .toDate();
    const endDateFormatted = moment(date + 1, "DD-MM-YYYY")
      .endOf("day")
      .toDate();

    let attendances = await Attendance.find({
      class_id: classId,
      date: { $gte: startDateFormatted, $lte: endDateFormatted },
    })
      .populate("student_id", "fullName")
      .populate("class_id", "className")
      .select("-createdAt -updatedAt -__v");
    res.status(200).json({
      status: 200,
      attendances,
    });
  } catch (error) {
    console.log(error.message);
    res.json(`Failed to fetch : ${error.message}`);
  }
};

module.exports = {
  FetchClasses,
  FetchAbsenceForClassInDay,
};
