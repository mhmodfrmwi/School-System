const expressAsyncHandler = require("express-async-handler");
const validateObjectId = require("../utils/validateObjectId");
const Subject = require("../DB/subjectModel");
const subjectValidationSchema = require("../validations/subjectValidation");

const createSubject = expressAsyncHandler(async (req, res) => {
  const { error } = subjectValidationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      status: 400,
      message: error.details[0].message,
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
      message: "Error getting this page",
    });
  }
  const subject = await Subject.findByIdAndDelete(id);
  if (!subject) {
    return res.status(404).json({
      status: 404,
      message: "Subject not found",
    });
  }
  res.status(200).json({
    status: 200,
    message: "Subject deleted successfully",
  });
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
