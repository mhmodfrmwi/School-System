const expressAsyncHandler = require("express-async-handler");
const validateObjectId = require("../../utils/validateObjectId");
const VirtualRoom = require("../../DB/virtualRoomManagerModel");
const virtualRoomValidationSchema = require("../../validations/virtualRoomValidation");
const AcademicYear = require("../../DB/academicYearModel");
const Semester = require("../../DB/semesterModel");
const moment = require("moment");

const createVirtualRoom = expressAsyncHandler(async (req, res) => {
  const managerId = req.user.id;

  if (!validateObjectId(managerId)) {
    return res.status(400).json({
      status: 400,
      message: "Invalid Manager ID",
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
  const currentYear = moment().year().toString().slice(-2);
    const currentMonth = moment().month() + 1;
    let startYear;
    if (currentMonth >= 9 && currentMonth <= 12) {
      startYear = "20" + parseInt(currentYear);
      endYear = "20" + (parseInt(currentYear) + 1);
    } else {
      startYear = "20" + (parseInt(currentYear) - 1);
      endYear = "20" + parseInt(currentYear);
    }

    let semester_name;
    if (currentMonth >= 9 && currentMonth <= 12) {
      semester_name = "Semester 1";
    } else {
      semester_name = "Semester 2";
    }

    const academic_year = await AcademicYear.findOne({ startYear, endYear });
    if (!academic_year) {
      return res.status(404).json({
        status: 404,
        message: "Academic year not found",
      });
    }
    const academicYearId = academic_year._id;
    const semester = await Semester.findOne({
      semesterName: semester_name,
      academicYear_id: academicYearId,
    });

    if (!semester) {
      return res.status(404).json({
        status: 404,
        message: "Semester not found in the given academic year",
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
    academicYearId,
    semesterId:semester._id,
    startTime,
    duration,
    link,
    managerId,
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

  const virtualRoom = await VirtualRoom.findById(id).populate("managerId", "fullName");
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
  const virtualRooms = await VirtualRoom.find().populate("managerId", "fullName");
  res.status(200).json({
    status: 200,
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