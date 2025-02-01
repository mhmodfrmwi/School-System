const expressAsyncHandler = require("express-async-handler");
const validateObjectId = require("../../utils/validateObjectId");
const scheduleValidationSchema = require("../../validations/scheduleValidation");
const Class = require("../../DB/classModel");
const Subject = require("../../DB/subjectModel");
const Grade = require("../../DB/gradeModel");
const Teacher = require("../../DB/teacher");
const AcademicYear = require("../../DB/academicYearModel");
const Schedule = require("../../DB/schedule");
const Semester = require("../../DB/semesterModel");

const createSchedule = expressAsyncHandler(async (req, res) => {
  const { error } = scheduleValidationSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      status: 400,
      message: error.details[0].message,
    });
  }

  const existingSubject = await Subject.findOne({
    subjectName: req.body.subjectName,
  });
  if (!existingSubject) {
    return res.status(404).json({
      status: 404,
      message: "Subject not found",
    });
  }

  const teacher = await Teacher.findOne({ fullName: req.body.teacherName });
  if (!teacher) {
    return res.status(404).json({
      status: 404,
      message: "Teacher not found",
    });
  }

  const academicYear = await AcademicYear.findOne({
    startYear: req.body.academicYear.slice(0, 4),
  });
  if (!academicYear) {
    return res.status(404).json({
      status: 404,
      message: "Academic year not found",
    });
  }
  const grade = await Grade.findOne({ gradeName: req.body.grade });
  if (!grade) {
    return res.status(404).json({
      status: 404,
      message: "Grade not found",
    });
  }
  const semester = await Semester.findOne({
    semesterName: req.body.semesterName,
    academicYear_id: academicYear._id,
  });
  if (!semester) {
    return res.status(404).json({
      status: 404,
      message: "Semester not found",
    });
  }

  const existingClass = await Class.findOne({
    className: req.body.className,
    gradeId: grade._id,
    academicYear_id: academicYear._id,
  });
  if (!existingClass) {
    return res.status(404).json({
      status: 404,
      message: "Class not found",
    });
  }
  const existingConflict = await Schedule.findOne({
    $or: [
      {
        teacher_id: teacher._id,
        day_of_week: req.body.day,
        $nor: [
          { end_time: { $lte: req.body.startTime } },
          { start_time: { $gte: req.body.endTime } },
        ],
      },
      {
        class_id: existingClass._id,
        grade_id: grade._id,
        semester_id: semester._id,
        academic_year_id: academicYear._id,
        day_of_week: req.body.day,
        $nor: [
          { end_time: { $lte: req.body.startTime } },
          { start_time: { $gte: req.body.endTime } },
        ],
      },
    ],
  }).populate(
    "class_id subject_id teacher_id grade_id semester_id academic_year_id"
  );

  if (existingConflict) {
    return res.status(409).json({
      status: 409,
      message: "there is a conflict with another schedule",
      conflictSchedule: existingConflict,
    });
  }

  const schedule = new Schedule({
    class_id: existingClass._id,
    subject_id: existingSubject._id,
    teacher_id: teacher._id,
    grade_id: grade._id,
    semester_id: semester._id,
    academic_year_id: academicYear._id,
    day_of_week: req.body.day,
    start_time: req.body.startTime,
    end_time: req.body.endTime,
  });

  await schedule.save();

  res.status(201).json({
    status: 201,
    message: "Schedule created successfully",
    schedule,
  });
});

const updateSchedule = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!validateObjectId(id)) {
    return res.status(400).json({
      status: 400,
      message: "Invalid Schedule ID",
    });
  }

  const { error } = scheduleValidationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      status: 400,
      message: error.details[0].message,
    });
  }

  const existingSubject = await Subject.findOne({
    subjectName: req.body.subjectName,
  });
  if (!existingSubject) {
    return res.status(404).json({
      status: 404,
      message: "Subject not found",
    });
  }

  const teacher = await Teacher.findOne({ fullName: req.body.teacherName });
  if (!teacher) {
    return res.status(404).json({
      status: 404,
      message: "Teacher not found",
    });
  }
  const grade = await Grade.findOne({ gradeName: req.body.grade });
  if (!grade) {
    return res.status(404).json({
      status: 404,
      message: "Grade not found",
    });
  }

  const academicYear = await AcademicYear.findOne({
    startYear: req.body.academicYear.slice(0, 4),
  });
  if (!academicYear) {
    return res.status(404).json({
      status: 404,
      message: "Academic year not found",
    });
  }
  const semester = await Semester.findOne({
    semesterName: req.body.semesterName,
  });
  if (!semester) {
    return res.status(404).json({
      status: 404,
      message: "Semester not found",
    });
  }
  const existingClass = await Class.findOne({
    className: req.body.className,
    gradeId: grade._id,
    academicYear_id: academicYear._id,
  });
  if (!existingClass) {
    return res.status(404).json({
      status: 404,
      message: "Class not found",
    });
  }

  const existingConflict = await Schedule.findOne({
    $or: [
      {
        teacher_id: teacher._id,
        day_of_week: req.body.day,
        $nor: [
          { end_time: { $lte: req.body.startTime } },
          { start_time: { $gte: req.body.endTime } },
        ],
      },
      {
        class_id: existingClass._id,
        grade_id: grade._id,
        semester_id: semester._id,
        academic_year_id: academicYear._id,
        day_of_week: req.body.day,
        $nor: [
          { end_time: { $lte: req.body.startTime } },
          { start_time: { $gte: req.body.endTime } },
        ],
      },
    ],
  }).populate(
    "class_id subject_id teacher_id grade_id semester_id academic_year_id"
  );
  if (existingConflict) {
    return res.status(409).json({
      status: 409,
      message: "there is a conflict with another schedule",
      conflictSchedule: existingConflict,
    });
  }
  const schedule = await Schedule.findByIdAndUpdate(
    id,
    {
      class_id: existingClass._id,
      subject_id: existingSubject._id,
      teacher_id: teacher._id,
      grade_id: grade._id,
      academicYear_id: academicYear._id,
      semester_id: semester._id,
      day_of_week: req.body.day,
      start_time: req.body.startTime,
      end_time: req.body.endTime,
    },
    { new: true }
  );

  if (!schedule) {
    return res.status(404).json({
      status: 404,
      message: "Schedule not found",
    });
  }

  res.status(200).json({
    status: 200,
    message: "Schedule updated successfully",
    schedule,
  });
});

const deleteSchedule = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!validateObjectId(id)) {
    return res.status(400).json({
      status: 400,
      message: "Invalid Schedule ID",
    });
  }

  const schedule = await Schedule.findByIdAndDelete(id);

  if (!schedule) {
    return res.status(404).json({
      status: 404,
      message: "Schedule not found",
    });
  }

  res.status(200).json({
    status: 200,
    message: "Schedule deleted successfully",
  });
});

const getSchedule = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!validateObjectId(id)) {
    return res.status(400).json({
      status: 400,
      message: "Invalid Schedule ID",
    });
  }

  const schedule = await Schedule.findById(id)
    .populate("class_id", "className")
    .populate("subject_id", "subjectName")
    .populate("teacher_id", "fullName")
    .populate("grade_id", "gradeName")
    .populate("academic_year_id", "startYear endYear")
    .populate("semester_id");

  if (!schedule) {
    return res.status(404).json({
      status: 404,
      message: "Schedule not found",
    });
  }

  res.status(200).json({
    status: 200,
    message: "Schedule retrieved successfully",
    schedule,
  });
});

const getAllSchedule = expressAsyncHandler(async (req, res) => {
  const schedules = await Schedule.find()
    .populate("class_id", "className")
    .populate("subject_id", "subjectName")
    .populate("teacher_id", "fullName")
    .populate("grade_id", "gradeName")
    .populate("academic_year_id", "startYear endYear")
    .populate("semester_id");

  res.status(200).json({
    status: 200,
    message: "Schedules retrieved successfully",
    schedules,
  });
});

module.exports = {
  createSchedule,
  updateSchedule,
  deleteSchedule,
  getSchedule,
  getAllSchedule,
};
