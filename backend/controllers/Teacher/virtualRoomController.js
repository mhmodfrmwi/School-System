const expressAsyncHandler = require("express-async-handler");
const validateObjectId = require("../../utils/validateObjectId");
const virtualRoomValidationSchema = require("../../validations/virtualRoomValidation");
const VirtualRoom = require("../../DB/virtualRoomModel");
const Subject = require("../../DB/subjectModel");
const AcademicYear = require("../../DB/academicYearModel");
const Grade = require("../../DB/gradeModel");
const Semester = require("../../DB/semesterModel");
const createVirtualRoom = expressAsyncHandler(async (req, res) => {
  const { error } = virtualRoomValidationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      status: 400,
      message: error.details[0].message,
    });
  }

  const { title, subjectName, academicYear, grade, semester, startTime, duration, link } = req.body;

  const [startYear, endYear] = academicYear.split("-").map(Number);

  const academicYearRecord = await AcademicYear.findOne({ startYear, endYear });
  if (!academicYearRecord) {
    return res.status(404).json({
      status: 404,
      message: "Academic Year not found",
    });
  }

  const subject = await Subject.findOne({ subjectName });
  if (!subject) {
    return res.status(404).json({
      status: 404,
      message: "Subject not found",
    });
  }

  const gradeDoc = await Grade.findOne({ grade });
  console.log(grade);
  if (!gradeDoc) {
    return res.status(404).json({
      status: 404,
      message: "Grade not found",
    });
  }

  const semesterDoc = await Semester.findOne({ semester });
  if (!semesterDoc) {
    return res.status(404).json({
      status: 404,
      message: "Semester not found",
    });
  }

  const existingVirtualRoom = await VirtualRoom.findOne({
    title,
    startTime,
  });

  if (existingVirtualRoom) {
    return res.status(400).json({
      status: 400,
      message: "Virtual room with the same title and start time already exists",
    });
  }

  const newVirtualRoom = new VirtualRoom({
    title,
    subjectId: subject._id,
    academicYearId: academicYearRecord._id,
    gradeId: gradeDoc._id,
    semesterId: semesterDoc._id,
    startTime,
    duration,
    link,
  });

  await newVirtualRoom.save();

  res.status(201).json({
    status: 201,
    message: "Virtual room created successfully",
    newVirtualRoom,
  });
});

const updateVirtualRoom = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!validateObjectId(id)) {
    return res.status(400).json({
      status: 400,
      message: "Invalid Virtual Room ID",
    });
  }

  const { error } = virtualRoomValidationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      status: 400,
      message: error.details[0].message,
    });
  }

  const { title, subjectName, academicYear, grade, semester, startTime, duration, link } = req.body;

  const [startYear, endYear] = academicYear.split("-").map(Number);

  const academicYearRecord = await AcademicYear.findOne({ startYear, endYear });
  if (!academicYearRecord) {
    return res.status(404).json({
      status: 404,
      message: "Academic Year not found",
    });
  }

  const existingVirtualRoom = await VirtualRoom.findById(id);
  if (!existingVirtualRoom) {
    return res.status(404).json({
      status: 404,
      message: "Virtual room not found",
    });
  }

  const subject = await Subject.findOne({ subjectName });
  if (!subject) {
    return res.status(404).json({
      status: 404,
      message: "Subject not found",
    });
  }

  const gradeDoc = await Grade.findOne({ grade });
  if (!gradeDoc) {
    return res.status(404).json({
      status: 404,
      message: "Grade not found",
    });
  }

  const semesterDoc = await Semester.findOne({ semester });
  if (!semesterDoc) {
    return res.status(404).json({
      status: 404,
      message: "Semester not found",
    });
  }

  const duplicateVirtualRoom = await VirtualRoom.findOne({
    _id: { $ne: id },
    title,
    startTime,
  });

  if (duplicateVirtualRoom) {
    return res.status(400).json({
      status: 400,
      message: "Virtual room with the same title and start time already exists",
    });
  }

  const updatedVirtualRoom = await VirtualRoom.findByIdAndUpdate(
    id,
    {
      title,
      subjectId: subject._id,
      academicYearId: academicYearRecord._id,
      gradeId: gradeDoc._id,
      semesterId: semesterDoc._id,
      startTime,
      duration,
      link,
    },
    { new: true }
  );

  res.status(200).json({
    status: 200,
    message: "Virtual room updated successfully",
    updatedVirtualRoom,
  });
});

const deleteVirtualRoom = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!validateObjectId(id)) {
    return res.status(400).json({
      status: 400,
      message: "Invalid Virtual Room ID",
    });
  }

  const existingVirtualRoom = await VirtualRoom.findById(id);
  if (!existingVirtualRoom) {
    return res.status(404).json({
      status: 404,
      message: "Virtual room not found",
    });
  }

  await VirtualRoom.findByIdAndDelete(id);

  res.status(200).json({
    status: 200,
    message: "Virtual room deleted successfully",
  });
});

const getVirtualRoom = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!validateObjectId(id)) {
    return res.status(400).json({
      status: 400,
      message: "Invalid Virtual Room ID",
    });
  }

  const virtualRoom = await VirtualRoom.findById(id)
    .populate("subjectId", "subjectName")
    .populate("academicYearId", "academicYear")
    .populate("gradeId", "grade")
    .populate("semesterId", "semester");

  if (!virtualRoom) {
    return res.status(404).json({
      status: 404,
      message: "Virtual room not found",
    });
  }

  res.status(200).json({
    status: 200,
    message: "Virtual room retrieved successfully",
    virtualRoom,
  });
});

const getAllVirtualRooms = expressAsyncHandler(async (req, res) => {
  const virtualRooms = await VirtualRoom.find()
    .populate("subjectId", "subjectName")
    .populate("academicYearId", "academicYear")
    .populate("gradeId", "grade")
    .populate("semesterId", "semester");

  res.status(200).json({
    status: 200,
    message: "Virtual rooms retrieved successfully",
    virtualRooms,
  });
});

module.exports = {
  createVirtualRoom,
  updateVirtualRoom,
  deleteVirtualRoom,
  getVirtualRoom,
  getAllVirtualRooms,
};