const expressAsyncHandler = require("express-async-handler");
const validateObjectId = require("../../utils/validateObjectId");
const virtualRoomService = require("../../services/virtualRoomService");
const handleVrLinkClick = expressAsyncHandler(async (req, res) => {
  const { virtualRoomId } = req.params;
  const studentId = req.user.id;

  if (!validateObjectId(virtualRoomId) || !validateObjectId(studentId)) {
    return res.status(400).json({
      status: 400,
      message: "Invalid virtual room ID or student ID.",
    });
  }

  try {
    const result = await virtualRoomService.handleVrLinkClick(
      virtualRoomId,
      studentId
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Failed to mark attendance.",
      error: error.message,
    });
  }
});

const getVirtualRoomsForStudent = expressAsyncHandler(async (req, res) => {
  const studentId = req.user.id;
  const { gradeSubjectSemesterId } = req.params;

  if (
    !validateObjectId(studentId) ||
    !validateObjectId(gradeSubjectSemesterId)
  ) {
    return res.status(400).json({
      status: 400,
      message: "Invalid student ID or gradeSubjectSemester ID.",
    });
  }

  try {
    const result = await virtualRoomService.getVirtualRoomsForStudent(
      studentId,
      gradeSubjectSemesterId
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Failed to retrieve virtual rooms.",
      error: error.message,
    });
  }
});

const getCompletedVirtualRooms = expressAsyncHandler(async (req, res) => {
  const studentId = req.user.id;
  const { gradeSubjectSemesterId } = req.params;

  if (
    !validateObjectId(studentId) ||
    !validateObjectId(gradeSubjectSemesterId)
  ) {
    return res.status(400).json({
      status: 400,
      message: "Invalid student ID or gradeSubjectSemester ID.",
    });
  }

  try {
    const result = await virtualRoomService.getCompletedVirtualRooms(
      studentId,
      gradeSubjectSemesterId
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Failed to retrieve completed virtual rooms.",
      error: error.message,
    });
  }
});

const getMissedVirtualRooms = expressAsyncHandler(async (req, res) => {
  const studentId = req.user.id;
  const { gradeSubjectSemesterId } = req.params;

  if (
    !validateObjectId(studentId) ||
    !validateObjectId(gradeSubjectSemesterId)
  ) {
    return res.status(400).json({
      status: 400,
      message: "Invalid student ID or gradeSubjectSemester ID.",
    });
  }

  try {
    const result = await virtualRoomService.getMissedVirtualRooms(
      studentId,
      gradeSubjectSemesterId
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Failed to retrieve missed virtual rooms.",
      error: error.message,
    });
  }
});

module.exports = {
  getVirtualRoomsForStudent,
  handleVrLinkClick,
  getCompletedVirtualRooms,
  getMissedVirtualRooms,
};
