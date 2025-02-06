const expressAsyncHandler = require("express-async-handler");
const validateObjectId = require("../../utils/validateObjectId");
const moment = require("moment");

const Semester = require("../../DB/semesterModel");
const Schedule = require("../../DB/schedule");
const AcademicYear = require("../../DB/academicYearModel");

const getScheduleForSpecificTeacher = expressAsyncHandler(async (req, res) => {
    const teacherId = req.user.id;

    if (!validateObjectId(teacherId)) {
      return res.status(400).json({
        status: 400,
        message: "Invalid Teacher ID",
      });
    }

    const currentYear = moment().year().toString().slice(-2);
    const currentMonth = moment().month() + 1;
    let startYear;
    let endYear;
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
    if (!academic_year) {
      return res.status(404).json({
        status: 404,
        message: "Academic year not found",
      });
    }
    const academicYearId = academic_year._id;

    const semester = await Semester.findOne({
      semesterName: semester_name,
      academicYear_id: academicYearId,
    });
    if (!semester) {
      return res.status(404).json({
        status: 404,
        message: "Semester not found in the given academic year",
      });
    }
    const semesterId = semester._id;

    const schedules = await Schedule.find({
      teacher_id: teacherId,
      semester_id: semesterId,
      academic_year_id: academicYearId,
    })
      .populate("class_id", "className")
      .populate("subject_id", "subjectName")
      .populate("grade_id", "gradeName")
      .populate("semester_id", "semesterName")
      .populate("academic_year_id", "startYear endYear");
  
    if (schedules.length === 0) {
      return res.status(404).json({
        status: 404,
        message: "No schedules found for the teacher in the current semester and academic year",
      });
    }

    res.status(200).json({
      status: 200,
      message: "Schedules retrieved successfully",
      schedules,
    });
  });

module.exports = {
    getScheduleForSpecificTeacher,
};