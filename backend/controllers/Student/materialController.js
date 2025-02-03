const expressAsyncHandler = require("express-async-handler");
const validateObjectId = require("../../utils/validateObjectId");
const GradeSubjectSemester = require("../../DB/gradeSubjectSemester");
const Material = require("../../DB/materielModel");
const BookMarkForMaterial = require("../../DB/bookMarkForMaterialModel");
const getMaterielForSpecificSubjectUsingGradeAndSemesterAndAcademicYear =
  expressAsyncHandler(async (req, res) => {
    const gradeSubjectSemesterId = req.params.id;
    if (validateObjectId(gradeSubjectSemesterId) === false) {
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

    const subjectMateriels = await Material.find({
      subject_id: gradeSubjectSemester.grade_subject_id.subjectId,
      grade_id: gradeSubjectSemester.grade_subject_id.gradeId,
      semester_id: gradeSubjectSemester.semester_id,
      academic_year_id: gradeSubjectSemester.grade_subject_id.academicYear_id,
    })
      .populate("subject_id")
      .populate("grade_id")
      .populate("academic_year_id")
      .populate("semester_id");

    const subjectMaterielsWithBookmarkAttribute = await Promise.all(
      subjectMateriels.map(async (materiel) => {
        const isBookmarked = await BookMarkForMaterial.findOne({
          student_id: req.user.id,
          material_id: materiel._id,
        });

        return {
          ...materiel.toObject(),
          isBookmarked: !!isBookmarked,
        };
      })
    );
    return res.status(200).json({
      status: 200,
      message: "Materiel retrieved successfully",
      materiels: subjectMaterielsWithBookmarkAttribute,
    });
  });
module.exports = {
  getMaterielForSpecificSubjectUsingGradeAndSemesterAndAcademicYear,
};
