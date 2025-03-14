const expressAsyncHandler = require("express-async-handler");
const validateObjectId = require("../../utils/validateObjectId");
const teacherValidationSchema = require("../../validations/teacherValidation");
const Teacher = require("../../DB/teacher");
const Subject = require("../../DB/subjectModel");
const generateAcademicNumber = require("../../utils/generateAcademicNumberForTeacher");
const hashPassword = require("../../utils/hashPassword");
const ClassTeacher = require("../../DB/classTeacherModel");
const Schedule = require("../../DB/schedule");

const createTeacher = expressAsyncHandler(async (req, res) => {
  const { error } = teacherValidationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      status: 400,
      message: error.details[0].message,
    });
  }

  const existingTeacher = await Teacher.findOne({
    $or: [{ email: req.body.email }, { phone: req.body.phone }],
  });
  if (existingTeacher) {
    return res.status(400).json({
      status: 400,
      message: "Email or phone number already exists",
    });
  }

  const subject = await Subject.findOne({ subjectName: req.body.subject });
  if (!subject) {
    return res.status(404).json({
      status: 404,
      message: "Subject not found",
    });
  }

  const teacher = new Teacher({
    academicNumber: await generateAcademicNumber(req.body.subject),
    fullName: req.body.fullName,
    dateOfBirth: req.body.dateOfBirth,
    email: req.body.email,
    password: await hashPassword(req.body.password),
    gender: req.body.gender,
    address: req.body.address,
    phone: req.body.phone,
    hireDate: new Date().getFullYear(),
    subjectId: subject._id,
  });

  await teacher.save();
  res.status(201).json({
    status: 201,
    message: "Teacher created successfully",
    teacher,
  });
});

const updateTeacher = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!validateObjectId(id)) {
    return res.status(400).json({
      status: 400,
      message: "Invalid Teacher ID",
    });
  }

  const { error } = teacherValidationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      status: 400,
      message: error.details[0].message,
    });
  }

  const existingTeacher = await Teacher.findOne({
    $and: [
      { _id: { $ne: id } },
      { $or: [{ email: req.body.email }, { phone: req.body.phone }] },
    ],
  });
  if (existingTeacher) {
    return res.status(400).json({
      status: 400,
      message: "Email or phone number already exists",
    });
  }

  const subject = await Subject.findOne({ subjectName: req.body.subject });
  if (!subject) {
    return res.status(404).json({
      status: 404,
      message: "Subject not found",
    });
  }

  const teacher = await Teacher.findByIdAndUpdate(
    id,
    {
      fullName: req.body.fullName,
      dateOfBirth: req.body.dateOfBirth,
      email: req.body.email,
      password: await hashPassword(req.body.password),
      gender: req.body.gender,
      address: req.body.address,
      phone: req.body.phone,
      subjectId: subject._id,
    },
    { new: true }
  );

  if (!teacher) {
    return res.status(404).json({
      status: 404,
      message: "Teacher not found",
    });
  }

  res.status(200).json({
    status: 200,
    message: "Teacher updated successfully",
    teacher,
  });
});

const deleteTeacher = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!validateObjectId(id)) {
    return res.status(400).json({
      status: 400,
      message: "Invalid Teacher ID",
    });
  }

  const teacher = await Teacher.findByIdAndDelete(id);
  if (!teacher) {
    return res.status(404).json({
      status: 404,
      message: "Teacher not found",
    });
  }

  try {
    await Promise.all([
      ClassTeacher.deleteMany({ teacherId: id }),
      Schedule.deleteMany({ teacher_id: id }),
    ]);

    res.status(200).json({
      status: 200,
      message: "Teacher and all related records deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Failed to delete teacher or related records",
      error: error.message,
    });
  }
});

const getTeacher = expressAsyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    if (!validateObjectId(id)) {
      return res.status(400).json({
        status: 400,
        message: "Invalid Teacher ID",
      });
    }

    const teacher = await Teacher.findById(id).populate(
      "subjectId",
      "subjectName"
    );

    if (!teacher) {
      return res.status(404).json({
        status: 404,
        message: "Teacher not found",
      });
    }

    res.status(200).json({
      status: 200,
      message: "Teacher retrieved successfully",
      teacher,
    });
  } catch (error) {
    console.log(`Failed ${error.message}`);
    res.json({ message: `Failed ${error.message}` });
  }
});

const getAllTeacher = expressAsyncHandler(async (req, res) => {
  try {
    const teachers = await Teacher.find().populate("subjectId", "subjectName");
    res.status(200).json({
      status: 200,
      message: "Teachers retrieved successfully",
      teachers,
    });
  } catch (error) {
    console.log(`Failed ${error.message}`);
    res.json({ message: `Failed ${error.message}` });
  }
});

module.exports = {
  createTeacher,
  updateTeacher,
  deleteTeacher,
  getAllTeacher,
  getTeacher,
};
