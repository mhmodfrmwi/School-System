const expressAsyncHandler = require("express-async-handler");
const materialService = require("../../services/materialService");
const validateObjectId = require("../../utils/validateObjectId");

const getMaterialForSpecificSubject = expressAsyncHandler(async (req, res) => {
  try {
    const gradeSubjectSemesterId = req.params.id;

    if (!validateObjectId(gradeSubjectSemesterId)) {
      return res.status(400).json({ status: 400, message: "Invalid ID" });
    }

    const result = await materialService.getMaterialsForSubject(
      gradeSubjectSemesterId,
      req.user.id
    );

    if (result.error) {
      return res.status(result.status).json(result);
    }

    return res.status(200).json({
      status: 200,
      message: "Materials retrieved successfully",
      materials: result.materials,
    });
  } catch (error) {
    console.error("Error fetching materials:", error);
    return res
      .status(500)
      .json({ status: 500, message: "Internal Server Error" });
  }
});

const getMaterialForSpecificGrade = expressAsyncHandler(async (req, res) => {
  try {
    const result = await materialService.getMaterialsForGrade(req.user.id);

    if (result.error) {
      return res.status(result.status).json(result);
    }

    res.status(200).json({
      status: 200,
      message: "Materials retrieved successfully",
      materials: result.materials,
      studentStats: result.studentStats,
    });
  } catch (error) {
    console.error("Error fetching materials:", error);
    return res
      .status(500)
      .json({ status: 500, message: "Internal Server Error" });
  }
});

module.exports = {
  getMaterialForSpecificSubject,
  getMaterialForSpecificGrade,
};
