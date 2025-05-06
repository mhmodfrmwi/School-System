const expressAsyncHandler = require("express-async-handler");
const Subject = require("../../DB/subjectModel");
const Grade = require("../../DB/gradeModel");
const Class = require("../../DB/classModel");
const AcademicYear = require("../../DB/academicYearModel");
const Semester = require("../../DB/semesterModel");
const Teacher = require("../../DB/TeacherModel");
const Student = require("../../DB/StudentModel");
const GradeSubject = require("../../DB/GradeSubjectModel");
const Question = require("../../DB/questionBankModel");
const exposeModels = expressAsyncHandler(async (req, res) => {
  const { modelName } = req.params;
  const models = {
    Subject: Subject.schema.obj,
    Grade: Grade.schema.obj,
    Class: Class.schema.obj,
    AcademicYear: AcademicYear.schema.obj,
    Semester: Semester.schema.obj,
    Teacher: Teacher.schema.obj,
    Student: Student.schema.obj,
    GradeSubject: GradeSubject.schema.obj,
    Question: Question.schema.obj,
  };

  if (models[modelName]) {
    res.json(models[modelName]);
  } else {
    res.status(404).json({ message: "Model not found" });
  }
});

module.exports = { exposeModels };
