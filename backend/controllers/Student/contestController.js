const contestValidationSchema = require("../../validations/contestValidation");
const expressAsyncHandler = require("express-async-handler");
const moment = require("moment");
const Contest = require("../../DB/contestModel");
const Student = require("../../DB/StudentModel");
const Subject = require("../../DB/subjectModel");
const Semester = require("../../DB/semesterModel");

const getContestForStudent = expressAsyncHandler(async (req, res) => {
  try {
    const { subjectName } = req.body;
    const studentId = req.user.id;

    const student = await Student.findById(studentId)
      .populate("gradeId")
      .populate("classId")
      .populate("academicYear_id");

    if (!student) {
      return res
        .status(404)
        .json({ status: 404, message: "Student not found" });
    }

    const subject = await Subject.findOne({ subjectName });
    if (!subject) {
      return res
        .status(404)
        .json({ status: 404, message: "Subject not found" });
    }

    const currentMonth = moment().month() + 1;
    let semester_name;
    if (currentMonth >= 9 && currentMonth <= 12) {
      semester_name = "Semester 1";
    } else {
      semester_name = "Semester 2";
    }

    const semester = await Semester.findOne({
      semesterName: semester_name,
      academicYear_id: student.academicYear_id._id,
    });

    if (!semester) {
      return res.status(404).json({
        status: 404,
        message: "Semester not found in the given academic year",
      });
    }

    const contests = await Contest.find({
      subjectId: subject._id,
      gradeId: student.gradeId._id,
      classId: student.classId._id,
      academicYearId: student.academicYear_id._id,
      semesterId: semester._id,
    })
      .populate("teacherId", "fullName")
      .populate("subjectId", "subjectName");

    if (!contests.length) {
      return res
        .status(404)
        .json({ status: 404, message: "No contests found for this subject" });
    }

    res.status(200).json({
      status: 200,
      message: "Contests retrieved successfully",
      contests,
    });
  } catch (error) {
    console.log(`Failed ${error.message}`);
    res.json({ message: `Failed ${error.message}` });
  }
});

const getAllContestsForStudent = expressAsyncHandler(async (req, res) => {
  try {
    const studentId = req.user.id;

    const student = await Student.findById(studentId)
      .populate("gradeId")
      .populate("classId")
      .populate("academicYear_id");

    if (!student) {
      return res
        .status(404)
        .json({ status: 404, message: "Student not found" });
    }

    const currentMonth = moment().month() + 1;
    let semester_name;
    if (currentMonth >= 9 && currentMonth <= 12) {
      semester_name = "Semester 1";
    } else {
      semester_name = "Semester 2";
    }

    const semester = await Semester.findOne({
      semesterName: semester_name,
      academicYear_id: student.academicYear_id._id,
    });

    if (!semester) {
      return res.status(404).json({
        status: 404,
        message: "Semester not found in the given academic year",
      });
    }

    const contests = await Contest.find({
      gradeId: student.gradeId._id,
      classId: student.classId._id,
      academicYearId: student.academicYear_id._id,
      semesterId: semester._id,
    })
      .populate("teacherId", "fullName")
      .populate("subjectId", "subjectName");

    if (!contests.length) {
      return res
        .status(404)
        .json({ status: 404, message: "No contests found" });
    }

    res.status(200).json({
      status: 200,
      message: "Contests retrieved successfully",
      contests,
    });
  } catch (error) {
    console.log(`Failed ${error.message}`);
    res.json({ message: `Failed ${error.message}` });
  }
});

module.exports = {
  getContestForStudent,
  getAllContestsForStudent,
};
