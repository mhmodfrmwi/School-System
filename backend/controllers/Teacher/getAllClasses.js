const expressAsyncHandler = require("express-async-handler");
const validateObjectId = require("../../utils/validateObjectId");
const Teacher = require("../../DB/teacher");
const Class = require("../../DB/classModel");
const ClassTeacher = require("../../DB/classTeacherModel");
const GradeSubjectSemester = require("../../DB/gradeSubjectSemester");
const GradeSubject = require("../../DB/gradeSubject");
const Grade = require("../../DB/gradeModel");

const getTeacherClassesForCurrentSemester = expressAsyncHandler(
  async (req, res) => {
    const teacherId = req.user.id;

    if (!validateObjectId(teacherId)) {
      return res.status(400).json({ status: 400, message: "Invalid ID" });
    }

    const teacher = await Teacher.findById(teacherId).populate("subjectId");
    if (!teacher) {
      return res.status(404).json({
        status: 404,
        message: "Teacher not found",
      });
    }
    const subjectId = teacher.subjectId;

    const classTeachers = await ClassTeacher.find({ teacherId })
      .populate("classId")
      .populate("subjectId")
      .populate("semester_id");
    if (classTeachers.length === 0) {
      return res.status(404).json({
        status: 404,
        message: "No classes found for the teacher",
      });
    }

    const classIds = classTeachers.map((ct) => ct.classId);
    const classes = await Class.find({ _id: { $in: classIds } }).populate(
      "gradeId"
    );
    if (classes.length === 0) {
      return res.status(404).json({
        status: 404,
        message: "No classes found for the teacher",
      });
    }

    const gradeIds = classIds.map((c) => c.gradeId);
    const academicYearIds = classIds.map((c) => c.academicYear_id);
    const semesterIds = classTeachers.map((c) => c.semester_id);

    const gradeSubjects = await GradeSubject.find({
      subjectId,
      gradeId: { $in: gradeIds },
      academicYear_id: { $in: academicYearIds },
    }).exec();
    const gradeSubjectIds = gradeSubjects.map((gs) => gs._id);

    const gradeSubjectSemesters = await GradeSubjectSemester.find({
      grade_subject_id: { $in: gradeSubjectIds },
      semester_id: { $in: semesterIds },
    })
      .populate({ path: "grade_subject_id" })
      .exec();

    const response = gradeSubjectSemesters.map((gss, index) => {
      const classId = classIds[index];
      const gradeId = gradeIds[index];
      const semesterId = semesterIds[index];
      const subjectName = teacher.subjectId.subjectName;
      const subjectId = teacher.subjectId._id;
      const gradeName = classes[index].gradeId.gradeName;
      const className = classes[index].className;
      const semesterName = classTeachers[index].semester_id.semesterName;

      return {
        id: gss._id,
        gradeId,
        semesterId,
        classId,
        subjectId,
        subjectName,
        gradeName,
        className,
        semesterName,
      };
    });

    return res.status(200).json({
      status: 200,
      message: "Classes retrieved successfully",
      data: response,
    });
  }
);

const getAllTeacherClasses = expressAsyncHandler(async (req, res) => {
  const teacherId = req.user.id;

  if (!validateObjectId(teacherId)) {
    return res.status(400).json({ status: 400, message: "Invalid ID" });
  }

  const teacher = await Teacher.findById(teacherId);
  if (!teacher) {
    return res.status(404).json({
      status: 404,
      message: "Teacher not found",
    });
  }

  const classTeachers = await ClassTeacher.find({ teacherId })
    .populate({
      path: "classId",
      populate: {
        path: "gradeId",
        model: "Grade",
      },
    })
    .populate("subjectId")
    .populate("semester_id")
    .populate("academicYear_id");

  if (classTeachers.length === 0) {
    return res.status(404).json({
      status: 404,
      message: "No classes found for the teacher",
    });
  }

  const response = await Promise.all(
    classTeachers.map(async (ct) => {
      const gradeSubject = await GradeSubject.findOne({
        subjectId: ct.subjectId._id,
        gradeId: ct.classId.gradeId._id,
        academicYear_id: ct.academicYear_id._id,
      });

      let gradeSubjectSemesterId = null;
      if (gradeSubject) {
        const gradeSubjectSemester = await GradeSubjectSemester.findOne({
          grade_subject_id: gradeSubject._id,
          semester_id: ct.semester_id._id,
        });
        if (gradeSubjectSemester) {
          gradeSubjectSemesterId = gradeSubjectSemester._id;
        }
      }

      return {
        classId: ct.classId._id,
        className: ct.classId.className,
        subjectId: ct.subjectId._id,
        subjectName: ct.subjectId.subjectName,
        semesterId: ct.semester_id._id,
        semesterName: ct.semester_id.semesterName,
        academicYearId: ct.academicYear_id._id,
        academicYearStart: ct.academicYear_id.startYear,
        academicYearEnd: ct.academicYear_id.endYear,
        gradeId: ct.classId.gradeId._id,
        gradeName: ct.classId.gradeId?.gradeName,
        gradeSubjectSemesterId,
      };
    })
  );

  return res.status(200).json({
    status: 200,
    message: "All classes retrieved successfully",
    data: response,
  });
});

module.exports = {
  getTeacherClassesForCurrentSemester,
  getAllTeacherClasses,
};
