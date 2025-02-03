const expressAsyncHandler = require("express-async-handler");
const validateObjectId = require("../../utils/validateObjectId");
const moment = require("moment");

const student = require("../../DB/student");
const Semester = require("../../DB/semesterModel");
const Schedule = require("../../DB/schedule");
const AcademicYear = require("../../DB/academicYearModel");
const getScheduleForSpecificStudent = expressAsyncHandler(async (req, res) => {
  const student_id = req.user.id;

  if (!validateObjectId(student_id)) {
    return res.status(400).json({ status: 400, message: "Invalid ID" });
  }
  const existingStudent = await student.findById(student_id);
  if (!existingStudent) {
    return res.status(404).json({ status: 404, message: "Student not found" });
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

  let semester_name;
  if (currentMonth >= 9 && currentMonth <= 12) {
    semester_name = "Semester 1";
  } else {
    semester_name = "Semester 2";
  }

  const academic_year = await AcademicYear.findOne({ startYear, endYear });
  const grade_id = existingStudent.gradeId;
  const class_id = existingStudent.classId;
  const academic_year_id = academic_year._id;
  const semester = await Semester.findOne({
    semesterName: semester_name,
    academicYear_id: existingStudent.academicYear_id,
  });
  if (!semester) {
    return res.status(404).json({ status: 404, message: "Semester not found" });
  }

  const schedules = await Schedule.find({
    class_id,
    grade_id,
    academic_year_id,
    semester_id: semester._id,
  })
    .populate("subject_id")
    .populate("grade_id")
    .populate("academic_year_id")
    .populate("semester_id")
    .populate("teacher_id")
    .populate("class_id")
    .populate("grade_id")
    .populate("academic_year_id");
  res.status(200).json({ status: 200, schedules });
});
module.exports = { getScheduleForSpecificStudent };
