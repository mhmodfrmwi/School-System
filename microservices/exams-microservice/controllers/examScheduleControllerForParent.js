const AcademicYear = require("../models/AcademicYear");
const ExamSchedule = require("../models/ExamSchedule");
const Grade = require("../models/Grade");
const Semester = require("../models/Semester");
const Student = require("../models/Student");
const Subject = require("../models/Subject");
const mongoose = require("mongoose");

// GET /api/v1/exam-schedules/:id
const getExamScheduleById = async (req, res) => {
  try {
    const schedule = await ExamSchedule.findById(req.params.id)
      .populate("academic_year_id", "startYear endYear")
      .populate("semester_id", "semesterName")
      .populate("grade_id", "gradeName")
      .populate("subjects.subject_id", "subjectName");

    if (!schedule) {
      return res.status(404).json({ message: "Exam schedule not found" });
    }

    res.json(schedule);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch exam schedule" });
  }
};


// GET /api/v1/exam-schedules/grade/:grade_id/semester/:semester_id
const getScheduleByGradeAndSemester = async (req, res) => {
  try {
    const { grade_id, semester_id } = req.params;

    if (
      !mongoose.Types.ObjectId.isValid(grade_id) ||
      !mongoose.Types.ObjectId.isValid(semester_id)
    ) {
      return res.status(400).json({ message: "Invalid grade or semester ID" });
    }

    const schedule = await ExamSchedule.findOne({
      grade_id,
      semester_id,
    })
      .populate("academic_year_id", "yearName")
      .populate("semester_id", "semesterName")
      .populate("grade_id", "gradeName")
      .populate({
        path: "subjects.subject_id",
        select: "subjectName",
      });

    if (!schedule) {
      return res.status(404).json({
        message: "Exam schedule not found for the specified grade and semester",
      });
    }

    const formattedResponse = {
      academic_year: schedule.academic_year_id.yearName,
      semester: schedule.semester_id.semesterName,
      grade: schedule.grade_id.gradeName,
      exams: schedule.subjects.map((subject) => ({
        subject: subject.subject_id.subjectName,
        exam_date: subject.exam_date,
        start_time: subject.start_time,
        end_time: subject.end_time,
      })),
    };

    res.json(formattedResponse);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch exam schedule",
      error: error.message,
    });
  }
};

const getCurrentSemesterSchedules = async (req, res) => {
  try {
    const latestAcademicYear = await AcademicYear.findOne()
      .sort({ endYear: -1 })
      .lean();

    if (!latestAcademicYear) {
      return res.status(404).json({ message: "No academic years found" });
    }

    const semesters = await Semester.find({
      academicYear_id: latestAcademicYear._id,
    })
      .populate("academicYear_id")
      .lean();

    if (semesters.length === 0) {
      return res.status(404).json({
        message: `No semesters found for academic year ${latestAcademicYear.startYear}-${latestAcademicYear.endYear}`,
      });
    }

    const grades = await Grade.find().sort({ gradeOrder: 1 }).lean();

    const schedules = await ExamSchedule.find({
      semester_id: { $in: semesters.map((s) => s._id) },
    })
      .populate("grade_id", "gradeName")
      .populate("semester_id", "semesterName")
      .populate({
        path: "subjects.subject_id",
        select: "subjectName",
      })
      .lean();

    const response = grades.map((grade) => {
      const gradeSchedules = schedules.filter(
        (s) => s.grade_id._id.toString() === grade._id.toString()
      );

      return {
        grade: grade.gradeName,
        schedules:
          gradeSchedules.length > 0
            ? gradeSchedules.map((schedule) => ({
                semester: schedule.semester_id.semesterName,
                schedule_id: schedule._id,
                exams: schedule.subjects.map((subject) => ({
                  exam_id: subject._id,
                  subject: subject.subject_id.subjectName,
                  date: subject.exam_date,
                  time: `${subject.start_time} - ${subject.end_time}`,
                })),
              }))
            : [
                {
                  message:
                    "No exam schedule available for current academic year",
                },
              ],
      };
    });

    res.json({
      academic_year: `${latestAcademicYear.startYear}-${latestAcademicYear.endYear}`,
      grades: response,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch schedules",
      error: error.message,
    });
  }
};

const getUpcomingExams = async (req, res) => {
  try {
    const { student_id } = req.params;

    const student = await Student.findById(student_id).select("gradeId");
    if (!student || !student.gradeId) {
      return res.status(404).json({ message: "Student or grade not found" });
    }

    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(startDate.getDate() + 60);
    console.log(startDate);
    console.log(endDate);

    const schedules = await ExamSchedule.find({
      grade_id: student.gradeId,
      "subjects.exam_date": {
        $gte: startDate,
        $lte: endDate,
      },
    }).populate({
      path: "subjects.subject_id",
      select: "subjectName",
    });
    console.log(schedules);

    const upcomingExams = schedules.flatMap((schedule) =>
      schedule.subjects.map((exam) => ({
        subject: exam.subject_id.subjectName,
        exam_date: exam.exam_date,
        start_time: exam.start_time,
        end_time: exam.end_time,
      }))
    );

    res.json(upcomingExams);
  } catch (error) {
    console.error("Error fetching upcoming exams:", error.message);
    res.status(500).json({ message: "Failed to fetch upcoming exams" });
  }
};
module.exports = {
  getExamScheduleById,
  getScheduleByGradeAndSemester,
  getCurrentSemesterSchedules,
  getUpcomingExams,
};
