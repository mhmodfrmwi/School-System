const expressAsyncHandler = require("express-async-handler");
const validateObjectId = require("../../utils/validateObjectId");
const Teacher = require("../../DB/teacher");

const getLoggedInTeacherData = expressAsyncHandler(async (req, res) => {
  const teacherId = req.user.id;

  if (!validateObjectId(teacherId)) {
    return res.status(400).json({ status: 400, message: "Invalid teacher ID" });
  }

  try {
    const teacher = await Teacher.findById(teacherId)
      .select("-password")
      .populate("subjectId", "subjectName");

    if (!teacher) {
      return res.status(404).json({
        status: 404,
        message: "Teacher not found",
      });
    }

    return res.status(200).json({
      status: 200,
      message: "Teacher data retrieved successfully",
      data: teacher,
    });

  } catch (error) {
    console.error("Error fetching teacher data:", error);
    return res.status(500).json({
      status: 500,
      message: "Internal server error while fetching teacher data",
    });
  }
});

module.exports = {
  getLoggedInTeacherData
};