const expressAsyncHandler = require("express-async-handler");
const validateObjectId = require("../../utils/validateObjectId");
const moment = require("moment");

const classTeacherValidationSchema = require("../../validations/classTeacherValidation");
const Subject = require("../../DB/subjectModel");
const Teacher = require("../../DB/teacher");
const AcademicYear = require("../../DB/academicYearModel");
const ClassTeacher = require("../../DB/classTeacherModel");
const Class = require("../../DB/classModel");
const GradeSubjectSemester = require("../../DB/gradeSubjectSemester");
const Semester = require("../../DB/semesterModel");

const createClassTeacher = expressAsyncHandler(async (req, res) => {
  const { error } = classTeacherValidationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      status: 400,
      message: error.details[0].message,
    });
  }

  const { classId, subjectName, teacherName, academicYear } = req.body;

  const existingClass = await Class.findById(classId);
  if (!existingClass) {
    return res.status(404).json({
      status: 404,
      message: "Class not found",
    });
  }

  const existingSubject = await Subject.findOne({ subjectName });
  if (!existingSubject) {
    return res.status(404).json({
      status: 404,
      message: "Subject not found",
    });
  }

  const existingTeacher = await Teacher.findOne({ fullName: teacherName });
  if (!existingTeacher) {
    return res.status(404).json({
      status: 404,
      message: "Teacher not found",
    });
  }

  const startYear = academicYear.slice(0, 4);
  const existingAcademicYear = await AcademicYear.findOne({ startYear });
  if (!existingAcademicYear) {
    return res.status(404).json({
      status: 404,
      message: "Academic year not found",
    });
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
    academicYear_id: existingAcademicYear._id,
  });
  if (!semester) {
    return res.status(404).json({
      status: 404,
      message: "Semester not found in the given academic year",
    });
  }
  const gradeSubjectSemester = await GradeSubjectSemester.findOne({
    subjectId: existingSubject._id,
    gradeId: existingClass.gradeId._id,
    semesterId: semester._id,
  });
  if (!gradeSubjectSemester) {
    return res.status(404).json({
      status: 404,
      message: "GradeSubjectSemester not found",
    });
  }
  const existingClassTeacher = await ClassTeacher.findOne({
    classId: existingClass._id,
    subjectId: existingSubject._id,
    teacherId: existingTeacher._id,
    academicYear_id: existingAcademicYear._id,
    semester_id: semester._id,
  })
    .populate("classId")
    .populate("subjectId")
    .populate("teacherId");
  if (existingClassTeacher) {
    return res.status(400).json({
      status: 400,
      message: "Teacher already assigned to this class",
    });
  }

  const classTeacher = new ClassTeacher({
    classId: existingClass._id,
    subjectId: existingSubject._id,
    teacherId: existingTeacher._id,
    academicYear_id: existingAcademicYear._id,
    semester_id: semester._id,
  });

  await classTeacher.save();

  res.status(201).json({
    status: 201,
    message: "Teacher assigned to a class successfully",
    classTeacher,
  });
});

const updateClassTeacher = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!validateObjectId(id)) {
    return res.status(400).json({
      status: 400,
      message: "Invalid ClassTeacher ID",
    });
  }

  const { error } = classTeacherValidationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      status: 400,
      message: error.details[0].message,
    });
  }

  const existingClass = await Class.findOne({ className: req.body.className });
  if (!existingClass) {
    return res.status(404).json({
      status: 404,
      message: "Class not found",
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

  const existingTeacher = await Teacher.findOne({
    fullName: req.body.teacherName,
  });

  if (!existingTeacher) {
    return res.status(404).json({
      status: 404,
      message: "Teacher not found",
    });
  }

  const startYear = req.body.academicYear.slice(0, 4);
  const academicYear = await AcademicYear.findOne({ startYear });
  if (!academicYear) {
    return res.status(404).json({
      status: 404,
      message: "Academic year not found",
    });
  }
  const currentMonth = moment().month() + 1;
  let semester_name;
  if (currentMonth >= 9 && currentMonth <= 12) {
    semester_name = "Semester 1";
  } else {
    semester_name = "Semester 2";
  }
  const semester = await Semester.findOne({
    semester_name,
    academicYear_id: existingAcademicYear._id,
  });
  if (!semester) {
    return res.status(404).json({
      status: 404,
      message: "Semester not found in the given academic year",
    });
  }
  const existingClassTeacher = await ClassTeacher.findOne({
    classId: existingClass._id,
    subjectId: existingSubject._id,
    teacherId: existingTeacher._id,
    academicYear_id: academicYear._id,
    semester_id: semester._id,
  });
  if (existingClassTeacher) {
    return res.status(400).json({
      status: 400,
      message: "Teacher already assigned to this class",
    });
  }
  const classTeacher = await ClassTeacher.findByIdAndUpdate(
    id,
    {
      classId: existingClass._id,
      subjectId: existingSubject._id,
      teacherId: existingTeacher._id,
      academicYear_id: academicYear._id,
    },
    { new: true }
  );

  if (!classTeacher) {
    return res.status(404).json({
      status: 404,
      message: "ClassTeacher not found",
    });
  }

  res.status(200).json({
    status: 200,
    message: "ClassTeacher updated successfully",
    classTeacher,
  });
});

const deleteClassTeacher = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!validateObjectId(id)) {
    return res.status(400).json({
      status: 400,
      message: "Invalid ClassTeacher ID",
    });
  }

  const classTeacher = await ClassTeacher.findByIdAndDelete(id);

  if (!classTeacher) {
    return res.status(404).json({
      status: 404,
      message: "ClassTeacher not found",
    });
  }

  res.status(200).json({
    status: 200,
    message: "ClassTeacher deleted successfully",
  });
});

const getClassTeacher = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!validateObjectId(id)) {
    return res.status(400).json({
      status: 400,
      message: "Invalid ClassTeacher ID",
    });
  }

  const classTeacher = await ClassTeacher.findById(id)
    .populate({ path: "classId", select: ["className", "gradeId"] })
    .populate("subjectId", "subjectName")
    .populate("teacherId", "fullName")
    .populate("academicYear_id", "startYear endYear");

  if (!classTeacher) {
    return res.status(404).json({
      status: 404,
      message: "ClassTeacher not found",
    });
  }

  res.status(200).json({
    status: 200,
    message: "ClassTeacher retrieved successfully",
    classTeacher,
  });
});

const getAllClassTeacher = expressAsyncHandler(async (req, res) => {
  const classTeachers = await ClassTeacher.find()
    .populate({
      path: "classId",
      select: ["className"],
      populate: {
        path: "gradeId",
      },
    })
    .populate("subjectId", "subjectName")
    .populate("teacherId", "fullName")
    .populate("academicYear_id", "startYear endYear");

  res.status(200).json({
    status: 200,
    message: "ClassTeachers retrieved successfully",
    classTeachers,
  });
});

module.exports = {
  createClassTeacher,
  updateClassTeacher,
  deleteClassTeacher,
  getClassTeacher,
  getAllClassTeacher,
};
//Semester 2
//Semester 2
//Semester 2
