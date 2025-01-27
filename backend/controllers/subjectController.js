const expressAsyncHandler = require("express-async-handler");
const validateObjectId = require("../utils/validateObjectId");
const Subject = require("../DB/subjectModel");
const subjectValidationSchema = require("../validations/subjectValidation");
const GradeSubject = require("../DB/gradeSubject");
const gradeSubjectSemester = require("../DB/gradeSubjectSemester");
const ClassTeacher = require("../DB/classTeacherModel");
const Schedule = require("../DB/schedule");

const createSubject = expressAsyncHandler(async (req, res) => {
  const { error } = subjectValidationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      status: 400,
      message: error.details[0].message,
    });
  }
  const existingSubject = await Subject.findOne({
    subjectName: req.body.subjectName,
  });
  if (existingSubject) {
    return res.status(400).json({
      status: 400,
      message: "Subject with the same name already exists.",
    });
  }
  const subject = new Subject({
    subjectName: req.body.subjectName,
  });
  await subject.save();
  res.status(201).json({
    status: 201,
    message: "Subject created successfully",
    subject,
  });
});

const updateSubject = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!validateObjectId(id)) {
    return res.status(400).json({
      status: 400,
      message: "Error getting this page",
    });
  }
  const { error } = subjectValidationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      status: 400,
      message: error.details[0].message,
    });
  }
  const subject = await Subject.findByIdAndUpdate(
    id,
    { subjectName: req.body.subjectName },
    { new: true }
  );
  if (!subject) {
    return res.status(404).json({
      status: 404,
      message: "Subject not found",
    });
  }
  res.status(200).json({
    status: 200,
    message: "Subject updated successfully",
    subject,
  });
});

const deleteSubject = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!validateObjectId(id)) {
    return res.status(400).json({
      status: 400,
      message: "Invalid subject ID",
    });
  }

  const subject = await Subject.findByIdAndDelete(id);
  if (!subject) {
    return res.status(404).json({
      status: 404,
      message: "Subject not found",
    });
  }

  try {
    await ClassTeacher.deleteMany({ subjectId: subject._id });
    await Schedule.deleteMany({ subjectId: subject._id });
    const gradeSubjects = await GradeSubject.find({ subject_id: id });

    await Promise.all(
      gradeSubjects.map(async (GS) => {
        await gradeSubjectSemester.deleteMany({ grade_subject_id: GS._id });
        await GradeSubject.findByIdAndDelete(GS._id);
      })
    );

    res.status(200).json({
      status: 200,
      message: "Subject and all related records deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Failed to delete related records",
      error: error.message,
    });
  }
});

const getSubject = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!validateObjectId(id)) {
    return res.status(400).json({
      status: 400,
      message: "Error getting this page",
    });
  }
  const subject = await Subject.findById(id);
  if (!subject) {
    return res.status(404).json({
      status: 404,
      message: "Subject not found",
    });
  }
  res.status(200).json({
    status: 200,
    subject,
  });
});

const getAllSubject = expressAsyncHandler(async (req, res) => {
  const subjects = await Subject.find();
  res.status(200).json({
    status: 200,
    subjects,
  });
});

module.exports = {
  createSubject,
  updateSubject,
  deleteSubject,
  getSubject,
  getAllSubject,
};
