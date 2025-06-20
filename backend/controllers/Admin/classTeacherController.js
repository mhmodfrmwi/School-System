const expressAsyncHandler = require("express-async-handler");
const validateObjectId = require("../../utils/validateObjectId");
const moment = require("moment");
const classTeacherValidationSchema = require("../../validations/classTeacherValidation");
const Subject = require("../../DB/subjectModel");
const Teacher = require("../../DB/TeacherModel");
const AcademicYear = require("../../DB/academicYearModel");
const ClassTeacher = require("../../DB/classTeacherModel");
const Class = require("../../DB/classModel");
const GradeSubjectSemester = require("../../DB/GradeSubjectSemesterModel");
const Semester = require("../../DB/semesterModel");
const GradeSubject = require("../../DB/GradeSubjectModel");

// Common population configuration
const populateClassTeacher = (query) =>
  query
    .populate({
      path: "classId",
      select: "className",
      populate: { path: "gradeId", select: "gradeName" },
    })
    .populate("subjectId", "subjectName")
    .populate("teacherId", "fullName")
    .populate("academicYear_id", "startYear endYear")
    .populate("semester_id", "semesterName");

// Common validation middleware
const validateClassTeacherInput = expressAsyncHandler(
  async (req, res, next) => {
    const { error } = classTeacherValidationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: 400,
        message: error.details[0].message,
      });
    }
    next();
  }
);

const getSemesterInfo = async (academicYearId) => {
  const currentMonth = moment().month() + 1;
  const semesterName =
    currentMonth >= 9 && currentMonth <= 12 ? "Semester 1" : "Semester 2";
  return Semester.findOne({
    semesterName,
    academicYear_id: academicYearId,
  });
};

const createClassTeacher = [
  validateClassTeacherInput,
  expressAsyncHandler(async (req, res) => {
    const { classId, subjectName, teacherName, academicYear } = req.body;

    // Validate academic year format
    const [startYear, endYear] = academicYear.split("-");
    if (!/^\d{4}-\d{4}$/.test(academicYear)) {
      return res.status(400).json({
        status: 400,
        message: "Invalid academic year format. Use YYYY-YYYY",
      });
    }

    const [existingClass, subject, teacher, academicYearRecord] =
      await Promise.all([
        Class.findById(classId),
        Subject.findOne({
          subjectName: { $regex: new RegExp(`^${subjectName}$`, "i") },
        }),
        Teacher.findOne({
          fullName: { $regex: new RegExp(`^${teacherName}$`, "i") },
        }),
        AcademicYear.findOne({ startYear, endYear }),
      ]);

    if (!existingClass)
      return res.status(404).json({ status: 404, message: "Class not found" });
    if (!subject)
      return res
        .status(404)
        .json({ status: 404, message: "Subject not found" });
    if (!teacher)
      return res
        .status(404)
        .json({ status: 404, message: "Teacher not found" });
    if (!academicYearRecord)
      return res
        .status(404)
        .json({ status: 404, message: "Academic year not found" });

    const [semester, gradeSubject] = await Promise.all([
      getSemesterInfo(academicYearRecord._id),
      GradeSubject.findOne({
        subjectId: subject._id,
        gradeId: existingClass.gradeId,
        academicYear_id: academicYearRecord._id,
      }),
    ]);

    if (!semester)
      return res
        .status(404)
        .json({ status: 404, message: "Semester not found" });
    if (!gradeSubject)
      return res
        .status(404)
        .json({ status: 404, message: "Subject not available for this grade" });

    const gradeSubjectSemester = await GradeSubjectSemester.findOne({
      grade_subject_id: gradeSubject._id,
      semester_id: semester._id,
    });

    if (!gradeSubjectSemester)
      return res.status(404).json({
        status: 404,
        message: "Subject-semester combination not found",
      });

    const existingAssignment = await ClassTeacher.findOne({
      classId,
      subjectId: subject._id,
      teacherId: teacher._id,
      academicYear_id: academicYearRecord._id,
      semester_id: semester._id,
    });

    if (existingAssignment) {
      return res.status(409).json({
        status: 409,
        message: "Teacher already assigned to this class for the semester",
      });
    }

    const classTeacher = await ClassTeacher.create({
      classId: existingClass._id,
      subjectId: subject._id,
      teacherId: teacher._id,
      academicYear_id: academicYearRecord._id,
      semester_id: semester._id,
    });

    const populated = await populateClassTeacher(
      ClassTeacher.findById(classTeacher._id)
    );

    res.status(201).json({
      status: 201,
      message: "Teacher assigned successfully",
      classTeacher: populated,
    });
  }),
];

const updateClassTeacher = [
  validateClassTeacherInput,
  expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    const { classId, subjectName, teacherName, academicYear } = req.body;
    console.log(classId, subjectName, teacherName, academicYear);

    if (!validateObjectId(id))
      return res.status(400).json({ status: 400, message: "Invalid ID" });

    // Fix: Handle the academic year query properly
    const academicYearQuery = /^\d{4}-\d{4}$/.test(academicYear)
      ? AcademicYear.findOne({
          startYear: academicYear.split("-")[0],
          endYear: academicYear.split("-")[1],
        })
      : Promise.resolve(null);

    const [
      existingAssignment,
      classInfo,
      subject,
      teacher,
      academicYearRecord,
    ] = await Promise.all([
      ClassTeacher.findById(id),
      Class.findById(classId),
      Subject.findOne({
        subjectName: { $regex: new RegExp(`^${subjectName}$`, "i") },
      }),
      Teacher.findOne({
        fullName: { $regex: new RegExp(`^${teacherName}$`, "i") },
      }),
      academicYearQuery, // Use the properly handled query
    ]);

    if (!existingAssignment)
      return res
        .status(404)
        .json({ status: 404, message: "Assignment not found" });
    if (!classInfo)
      return res.status(404).json({ status: 404, message: "Class not found" });
    if (!subject)
      return res
        .status(404)
        .json({ status: 404, message: "Subject not found" });
    if (!teacher)
      return res
        .status(404)
        .json({ status: 404, message: "Teacher not found" });
    if (!academicYearRecord)
      return res
        .status(400)
        .json({ status: 400, message: "Invalid academic year format" });

    const [semester, gradeSubject] = await Promise.all([
      getSemesterInfo(academicYearRecord._id),
      GradeSubject.findOne({
        subjectId: subject._id,
        gradeId: classInfo.gradeId,
        academicYear_id: academicYearRecord._id,
      }),
    ]);

    if (!semester)
      return res
        .status(404)
        .json({ status: 404, message: "Semester not found" });
    if (!gradeSubject)
      return res
        .status(404)
        .json({ status: 404, message: "Subject not available for this grade" });

    const duplicate = await ClassTeacher.findOne({
      _id: { $ne: id },
      classId,
      subjectId: subject._id,
      semester_id: semester._id,
    });

    if (duplicate)
      return res
        .status(409)
        .json({ status: 409, message: "Conflict: Duplicate assignment" });

    const updated = await ClassTeacher.findByIdAndUpdate(
      id,
      {
        classId: classInfo._id,
        subjectId: subject._id,
        teacherId: teacher._id,
        academicYear_id: academicYearRecord._id,
        semester_id: semester._id,
      },
      { new: true, runValidators: true }
    );

    const populated = await populateClassTeacher(
      ClassTeacher.findById(updated._id)
    );

    res.status(200).json({
      status: 200,
      message: "Assignment updated successfully",
      classTeacher: populated,
    });
  }),
];

const deleteClassTeacher = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!validateObjectId(id)) {
    return res.status(400).json({
      status: 400,
      message: "Invalid ID",
    });
  }

  const assignment = await ClassTeacher.findByIdAndDelete(id);
  if (!assignment)
    return res
      .status(404)
      .json({ status: 404, message: "Assignment not found" });

  res.status(200).json({
    status: 200,
    message: "Assignment deleted successfully",
  });
});

const getClassTeacher = expressAsyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    if (!validateObjectId(id))
      return res.status(400).json({ status: 400, message: "Invalid ID" });

    const assignment = await populateClassTeacher(ClassTeacher.findById(id));
    if (!assignment)
      return res
        .status(404)
        .json({ status: 404, message: "Assignment not found" });

    res.status(200).json({
      status: 200,
      message: "Assignment retrieved successfully",
      classTeacher: assignment,
    });
  } catch (error) {
    console.log(`Failed ${error.message}`);
    res.json({ message: `Failed ${error.message}` });
  }
});

const getAllClassTeacher = expressAsyncHandler(async (req, res) => {
  try {
    const assignments = await populateClassTeacher(ClassTeacher.find());
    res.status(200).json({
      status: 200,
      message: "Assignments retrieved successfully",
      classTeachers: assignments,
    });
  } catch (error) {
    console.log(`Failed ${error.message}`);
    res.json({ message: `Failed ${error.message}` });
  }
});

module.exports = {
  createClassTeacher,
  updateClassTeacher,
  deleteClassTeacher,
  getClassTeacher,
  getAllClassTeacher,
};
