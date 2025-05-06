const expressAsyncHandler = require("express-async-handler");
const validateObjectId = require("../../utils/validateObjectId");
const Student = require("../../DB/StudentModel");

const getLoggedInStudentData = expressAsyncHandler(async (req, res) => {
  const studentId = req.user.id;

  if (!validateObjectId(studentId)) {
    return res.status(400).json({
      status: 400,
      message: "Invalid student ID format",
      errorCode: "INVALID_STUDENT_ID",
    });
  }

  try {
    const student = await Student.findById(studentId)
      .select("-password -__v")
      .populate({
        path: "gradeId",
        select: "gradeName -_id",
      })
      .populate({
        path: "classId",
        select: "className -_id",
      })
      .populate({
        path: "academicYear_id",
        select: "startYear endYear -_id",
      })
      .lean();

    if (!student) {
      return res.status(404).json({
        status: 404,
        message: "Student account not found",
        errorCode: "STUDENT_NOT_FOUND",
      });
    }

    return res.status(200).json({
      status: 200,
      message: "Student data retrieved successfully",
      data: student,
    });
  } catch (error) {
    console.error("Student data fetch error:", error);
    return res.status(500).json({
      status: 500,
      message: "Error retrieving student data",
      errorCode: "STUDENT_DATA_FETCH_ERROR",
      error:
        process.env.NODE_ENV === "development"
          ? {
              message: error.message,
              stack: error.stack,
            }
          : undefined,
    });
  }
});

module.exports = {
  getLoggedInStudentData,
};
