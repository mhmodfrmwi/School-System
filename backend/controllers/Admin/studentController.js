const expressAsyncHandler = require("express-async-handler");
const moment = require("moment");
const validateObjectId = require("../../utils/validateObjectId");
const studentValidationSchema = require("../../validations/studentValidation");
const Student = require("../../DB/student");
const Grade = require("../../DB/gradeModel");
const Class = require("../../DB/classModel");
const AcademicYear = require("../../DB/academicYearModel");
const hashPassword = require("../../utils/hashPassword");
const Attendance = require("../../DB/attendenceModel");

const generateAcademicNumber = async () => {
  const currentYear = moment().year().toString().slice(-2);

  const lastStudent = await Student.findOne({
    academic_number: { $regex: `^${currentYear}` },
  }).sort({ academic_number: -1 });

  let sequenceNumber = 1;

  if (lastStudent) {
    const lastNumber = lastStudent.academic_number.slice(2);
    sequenceNumber = parseInt(lastNumber, 10) + 1;
  }

  return `${currentYear}${String(sequenceNumber).padStart(4, "0")}`;
};

async function createClass(gradeId, academicYearId, className) {
  const newClass = new Class({
    className,
    gradeId,
    academicYear_id: academicYearId,
  });

  await newClass.save();

  return newClass._id;
}

async function findClass(gradeId, academicYearId) {
  const allClasses = await Class.find({
    gradeId: gradeId,
    academicYear_id: academicYearId,
  }).sort({ className: 1 });
  console.log(allClasses);

  if (allClasses.length === 0) {
    const firstClass = await createClass(gradeId, academicYearId, "class 1");
    return firstClass._id;
  }

  const totalStudentsInGradeAndYear = await Student.countDocuments({
    gradeId: gradeId,
    academicYear_id: academicYearId,
  });

  const studentPosition = totalStudentsInGradeAndYear + 1;
  const classIndex = Math.floor((studentPosition - 1) / 30);

  let selectedClass;

  if (allClasses[classIndex]) {
    selectedClass = allClasses[classIndex];
  } else {
    const lastClass = allClasses[allClasses.length - 1].className;
    const lastClassNumber = parseInt(lastClass.className.match(/\d+/)[0]);
    const newClassName = `Class ${lastClassNumber + 1}`;
    selectedClass = await createClass(gradeId, academicYearId, newClassName);
  }

  if (selectedClass.student_count >= 30) {
    const lastClass = allClasses[allClasses.length - 1].className;
    const lastClassNumber = parseInt(lastClass.className.match(/\d+/)[0]);
    const newClassName = `Class ${lastClassNumber + 1}`;
    selectedClass = await createClass(gradeId, academicYearId, newClassName);
  }

  return selectedClass._id;
}

const createStudent = expressAsyncHandler(async (req, res) => {
  const { error } = studentValidationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      status: 400,
      message: error.details[0].message,
    });
  }

  const {
    fullName,
    emailAddress,
    phoneNumber,
    password,
    dateOfBirth,
    gender,
    grade,
    address,
  } = req.body;

  const existingStudent = await Student.findOne({
    $or: [{ email: emailAddress }, { phone: phoneNumber }],
  });

  if (existingStudent) {
    return res.status(400).json({
      status: 400,
      message: "Student with the same email or phone number already exists.",
    });
  }
  const currentYear = moment().year();
  const currentMonth = moment().month() + 1;

  let startYear;
  if (currentMonth >= 9) {
    startYear = currentYear;
  } else {
    startYear = currentYear - 1;
  }

  const academicYearRecord = await AcademicYear.findOne({ startYear });

  if (!academicYearRecord) {
    return res.status(404).json({
      status: 404,
      message: "Academic year not found",
    });
  }

  const academicNumber = await generateAcademicNumber();

  const gradeRecord = await Grade.findOne({ gradeName: grade });

  if (!gradeRecord) {
    return res.status(404).json({
      status: 404,
      message: "Grade not found",
    });
  }

  const classId = await findClass(gradeRecord._id, academicYearRecord._id);

  if (!validateObjectId(classId)) {
    return res.status(400).json({
      status: 400,
      message: classId,
    });
  }

  const admissionDate = moment().toDate();

  const newStudent = new Student({
    academic_number: academicNumber,
    fullName,
    dateOfBirth,
    gender,
    address,
    phone: phoneNumber,
    email: emailAddress,
    admission_date: admissionDate,
    password: await hashPassword(password),
    gradeId: gradeRecord._id,
    classId: classId,
    academicYear_id: academicYearRecord._id,
  });

  await newStudent.save();

  await Class.findByIdAndUpdate(classId, { $inc: { student_count: 1 } });

  res.status(201).json({
    status: 201,
    message: "Student created successfully",
    newStudent,
  });
});

const updateStudent = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!validateObjectId(id)) {
    return res.status(400).json({
      status: 400,
      message: "Invalid Student ID",
    });
  }

  const { error } = studentValidationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      status: 400,
      message: error.details[0].message,
    });
  }

  const {
    fullName,
    emailAddress,
    phoneNumber,
    password,
    dateOfBirth,
    gender,
    grade,
    address,
  } = req.body;

  const existingStudent = await Student.findOne({
    $and: [
      { _id: { $ne: id } },
      { $or: [{ email: emailAddress }, { phone: phoneNumber }] },
    ],
  });

  if (existingStudent) {
    return res.status(400).json({
      status: 400,
      message: "Student with the same email or phone number already exists.",
    });
  }

  const student = await Student.findById(id);
  if (!student) {
    return res.status(404).json({
      status: 404,
      message: "Student not found",
    });
  }

  const gradeRecord = await Grade.findOne({ gradeName: grade });
  if (!gradeRecord) {
    return res.status(404).json({
      status: 404,
      message: "Grade not found",
    });
  }

  const currentYear = moment().year();
  const currentMonth = moment().month() + 1;

  let startYear;
  if (currentMonth >= 9) {
    startYear = currentYear;
  } else {
    startYear = currentYear - 1;
  }

  const academicYearRecord = await AcademicYear.findOne({ startYear });
  if (!academicYearRecord) {
    return res.status(404).json({
      status: 404,
      message: "Academic year not found",
    });
  }

  const classId = await findClass(gradeRecord._id, academicYearRecord._id);

  if (!validateObjectId(classId)) {
    return res.status(400).json({
      status: 400,
      message: classId,
    });
  }

  const updateData = {
    fullName,
    dateOfBirth,
    gender,
    address,
    phone: phoneNumber,
    email: emailAddress,
    gradeId: gradeRecord._id,
    classId: classId,
    academicYear_id: academicYearRecord._id,
  };

  if (password) {
    updateData.password = await hashPassword(password);
  }

  const updatedStudent = await Student.findByIdAndUpdate(id, updateData, {
    new: true,
  });

  res.status(200).json({
    status: 200,
    message: "Student updated successfully",
    updatedStudent,
  });
});

const deleteStudent = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!validateObjectId(id)) {
    return res.status(400).json({
      status: 400,
      message: "Invalid Student ID",
    });
  }

  const student = await Student.findById(id);
  if (!student) {
    return res.status(404).json({
      status: 404,
      message: "Student not found",
    });
  }

  try {
    await Class.findByIdAndUpdate(student.classId, {
      $inc: { student_count: -1 },
    });
    await Student.findByIdAndDelete(id);
    await Attendance.deleteMany({ student_id: id });
    res.status(200).json({
      status: 200,
      message: "Student deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Failed to delete student",
      error: error.message,
    });
  }
});

const getStudent = expressAsyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    if (!validateObjectId(id)) {
      return res.status(400).json({
        status: 400,
        message: "Invalid Student ID",
      });
    }

    const student = await Student.findById(id)
      .populate("gradeId", "gradeName")
      .populate("classId", "className")
      .populate("academicYear_id", "startYear");

    if (!student) {
      return res.status(404).json({
        status: 404,
        message: "Student not found",
      });
    }

    res.status(200).json({
      status: 200,
      message: "Student retrieved successfully",
      student,
    });
  } catch (error) {
    console.log(`Failed ${error.message}`);
    res.json({ message: `Failed ${error.message}` });
  }
});

const getAllStudents = expressAsyncHandler(async (req, res) => {
  try {
    const students = await Student.find()
      .populate("gradeId", "gradeName")
      .populate("classId", "className")
      .populate("academicYear_id", "startYear");

    res.status(200).json({
      status: 200,
      message: "Students retrieved successfully",
      students,
    });
  } catch (error) {
    console.log(`Failed ${error.message}`);
    res.json({ message: `Failed ${error.message}` });
  }
});

module.exports = {
  createStudent,
  updateStudent,
  deleteStudent,
  getStudent,
  getAllStudents,
};
