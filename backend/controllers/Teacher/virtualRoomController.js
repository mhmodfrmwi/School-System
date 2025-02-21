const expressAsyncHandler = require("express-async-handler");
const validateObjectId = require("../../utils/validateObjectId");
const virtualRoomValidationSchema = require("../../validations/virtualRoomValidation");
const VirtualRoom = require("../../DB/virtualRoomModel");
const GradeSubjectSemester = require("../../DB/gradeSubjectSemester");
const GradeSubject = require("../../DB/gradeSubject");
const Class = require("../../DB/classModel");

const createVirtualRoom = expressAsyncHandler(async (req, res) => {
  const teacherId = req.user.id;

  if (!validateObjectId(teacherId)) {
    return res.status(400).json({
      status: 400,
      message: "Invalid Teacher ID",
    });
  }

  const { error } = virtualRoomValidationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      status: 400,
      message: error.details[0].message,
    });
  }

  const { gradeSubjectSemesterId, classId } = req.params;
  const { title, startTime, duration, link } = req.body;

  if (!validateObjectId(gradeSubjectSemesterId) || !validateObjectId(classId)) {
    return res.status(400).json({
      status: 400,
      message: "Invalid GradeSubjectSemester ID, Class ID",
    });
  }

  const gradeSubjectSemester = await GradeSubjectSemester.findById(gradeSubjectSemesterId)
    .populate("grade_subject_id")
    .populate("semester_id");
  
  if (!gradeSubjectSemester) {
    return res.status(404).json({
      status: 404,
      message: "GradeSubjectSemester not found",
    });
  }

  const existingClass = await Class.findById(classId);
  if (!existingClass) {
    return res.status(404).json({
      status: 404,
      message: "Class not found",
    });
  }

  const existingVirtualRoom = await VirtualRoom.findOne({ title, startTime });
  if (existingVirtualRoom) {
    return res.status(400).json({
      status: 400,
      message: "Virtual room with the same title and start time already exists",
    });
  }

  const newVirtualRoom = new VirtualRoom({
    title,
    subjectId: gradeSubjectSemester.grade_subject_id.subjectId,
    academicYearId: gradeSubjectSemester.semester_id.academicYear_id,
    gradeId: gradeSubjectSemester.grade_subject_id.gradeId,
    semesterId: gradeSubjectSemester.semester_id._id,
    classId,
    startTime,
    duration,
    link,
    teacherId,
  });

  await newVirtualRoom.save();
  
  res.status(201).json({
    status: 201,
    message: "Virtual room created successfully",
    newVirtualRoom,
  });
});

const updateVirtualRoom = expressAsyncHandler(async (req, res) => {
  const { id} = req.params;

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

  const { title, startTime, duration, link } = req.body;

  const existingVirtualRoom = await VirtualRoom.findById(id);
  if (!existingVirtualRoom) {
    return res.status(404).json({
      status: 404,
      message: "Virtual room not found",
    });
  }

  const duplicateVirtualRoom = await VirtualRoom.findOne({ _id: { $ne: id }, title, startTime });
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

  const deletedVirtualRoom = await VirtualRoom.findByIdAndDelete(id);
  if (!deletedVirtualRoom) {
    return res.status(404).json({
      status: 404,
      message: "Virtual room not found",
    });
  }

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

  const virtualRoom = await VirtualRoom.findById(id).populate("teacherId","fullName");
  if (!virtualRoom) {
    return res.status(404).json({
      status: 404,
      message: "Virtual room not found",
    });
  }

  res.status(200).json({
    status: 200,
    virtualRoom,
  });
});

const getAllVirtualRooms = expressAsyncHandler(async (req, res) => {
  const virtualRooms = await VirtualRoom.find().populate("teacherId","fullName");
  res.status(200).json({
    status: 200,
    virtualRooms,
  });
});

const getTeacherVirtualRooms = expressAsyncHandler(async (req, res) => {
  const teacherId = req.user.id;

  if (!validateObjectId(teacherId)) {
    return res.status(400).json({
      status: 400,
      message: "Invalid Teacher ID",
    });
  }

  const { id } = req.params;

  if (!validateObjectId(id)) {
    return res.status(400).json({ status: 400, message: "Invalid ID" });
  }

  try {
    const gradeSubjectSemester = await GradeSubjectSemester.findById(id);

    if (!gradeSubjectSemester) {
      return res.status(404).json({
        status: 404,
        message: "GradeSubjectSemester not found",
      });
    }

    const { grade_subject_id, semester_id } = gradeSubjectSemester;

    const gradeSubject = await GradeSubject.findById(grade_subject_id);

    if (!gradeSubject) {
      return res.status(404).json({
        status: 404,
        message: "GradeSubject not found",
      });
    }

    const { subjectId, gradeId, academicYear_id } = gradeSubject;

    const virtualRooms = await VirtualRoom.find({
      teacherId,
      subjectId,
      gradeId,
      academicYearId: academicYear_id,
      semesterId: semester_id,
    }).populate("teacherId", "fullName");

    res.status(200).json({
      status: 200,
      virtualRooms,
    });
  } catch (error) {
    console.error("Error fetching virtual rooms:", error);
    res.status(500).json({
      status: 500,
      message: "An error occurred while fetching virtual rooms",
    });
  }
});

module.exports = {
  createVirtualRoom,
  updateVirtualRoom,
  deleteVirtualRoom,
  getVirtualRoom,
  getAllVirtualRooms,
  getTeacherVirtualRooms
};