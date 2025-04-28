const expressAsyncHandler = require("express-async-handler");
const validateObjectId = require("../../utils/validateObjectId");
const GradeSubjectSemester = require("../../DB/gradeSubjectSemester");
const Material = require("../../DB/materielModel");
const BookMarkForMaterial = require("../../DB/bookMarkForMaterialModel");
const MaterialView = require("../../DB/MaterialView");
const student = require("../../DB/student");

const getMaterialForSpecificSubject = expressAsyncHandler(async (req, res) => {
  try {
    const gradeSubjectSemesterId = req.params.id;

    if (!validateObjectId(gradeSubjectSemesterId)) {
      return res.status(400).json({ status: 400, message: "Invalid ID" });
    }

    const gradeSubjectSemester = await GradeSubjectSemester.findById(
      gradeSubjectSemesterId
    ).populate("grade_subject_id");

    if (!gradeSubjectSemester) {
      return res
        .status(404)
        .json({ status: 404, message: "Grade Subject Semester not found" });
    }

    const materials = await Material.find({
      grade_subject_semester_id: gradeSubjectSemester._id,
    })
      .populate({
        path: "grade_subject_semester_id",
        populate: [
          {
            path: "grade_subject_id",
            populate: [{ path: "subjectId" }, { path: "gradeId" }],
          },
        ],
      })
      .populate("uploaded_by");

    const materialsWithAttributes = await Promise.all(
      materials.map(async (material) => {
        const [isBookmarked, isViewed] = await Promise.all([
          BookMarkForMaterial.findOne({
            student_id: req.user.id,
            material_id: material._id,
          }),
          MaterialView.findOne({
            student_id: req.user.id,
            material_id: material._id,
          }),
        ]);

        return {
          ...material.toObject(),
          isBookmarked: !!isBookmarked,
          isViewed: !!isViewed,
        };
      })
    );

    return res.status(200).json({
      status: 200,
      message: "Materials retrieved successfully",
      materials: materialsWithAttributes,
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
    const studentData = await student.findById(req.user.id);
    const gradeId = studentData.gradeId;
    const materials = await Material.find({})
      .populate({
        path: "grade_subject_semester_id",
        populate: [
          {
            path: "grade_subject_id",
            populate: [{ path: "subjectId" }, { path: "gradeId" }],
          },
        ],
      })
      .populate("uploaded_by");
    res.status(200).json({
      status: 200,
      message: "Materials retrieved successfully",
      materials,
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
