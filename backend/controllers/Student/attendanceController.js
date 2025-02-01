const expressAsyncHandler = require("express-async-handler");
const validateObjectId = require("../../utils/validateObjectId");
const attendanceValidationSchema = require("../../validations/attendanceValidation");
const Student = require("../../DB/student");
const Attendance = require("../../DB/attendenceModel");
const createStudentAttendance = expressAsyncHandler(async (req, res) => {
  const { error } = attendanceValidationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      status: 400,
      message: error.details[0].message,
    });
  }
  const { studentName, academicNumber, status } = req.body;
  const existingStudent = await Student.findOne({
    fullName: studentName,
    academic_number: academicNumber,
  });
  if (!existingStudent) {
    return res.status(404).json({
      status: 404,
      message: "Student not found",
    });
  }

  const existingAttendance = await Attendance.findOne({
    student_id: existingStudent._id,
    date: Date.now(),
  });
  if (existingAttendance) {
    return res.status(400).json({
      status: 400,
      message: "Attendance already exists for the given student and date",
    });
  }
  const attendance = new Attendance({
    student_id: existingStudent._id,
    academic_number: academicNumber,
    date: Date.now(),
    status,
    class_id: existingStudent.classId,
  });
  await attendance.save();
  res.status(201).json({
    status: 201,
    attendance,
  });
});

const updateStudentAttendance = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!validateObjectId(id)) {
    return res.status(400).json({
      status: 400,
      message: "Invalid Attendance ID",
    });
  }
  const { error } = attendanceValidationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      status: 400,
      message: error.details[0].message,
    });
  }
  const { status } = req.body;
  const attendance = await Attendance.findByIdAndUpdate(
    id,
    { status },
    { new: true }
  );
  if (!attendance) {
    return res.status(404).json({
      status: 404,
      message: "Attendance not found",
    });
  }
});

const deleteStudentAttendance = expressAsyncHandler(async (req, res) => {});
const getStudentAttendanceUsingStudentId = expressAsyncHandler(
  async (req, res) => {
    const studentId = req.user.id;
    if (!validateObjectId(studentId)) {
      return res.status(400).json({
        status: 400,
        message: "Invalid Student ID",
      });
    }
    const studentAttendance = await Attendance.find({ student_id: studentId });
    res.status(200).json({
      status: 200,
      studentAttendance,
    });
  }
);
const getAttendanceForClassInSpecificDate = expressAsyncHandler(
  async (req, res) => {}
);

module.exports = {
  createStudentAttendance,
  updateStudentAttendance,
  deleteStudentAttendance,
  getStudentAttendanceUsingStudentId,
  getAttendanceForClassInSpecificDate,
};
