const expressAsyncHandler = require("express-async-handler");
const validateObjectId = require("../../utils/validateObjectId");
const addRewardClaimAndUpdatePoints = require("../../utils/updatingRewards");
const Material = require("../../DB/materielModel");

const materialValidationSchema = require("../../validations/materialValidation");
const GradeSubjectSemester = require("../../DB/GradeSubjectSemesterModel");
const BookMarkForMaterial = require("../../DB/bookMarkForMaterialModel");
const createMateriel = expressAsyncHandler(async (req, res) => {
  const teacherId = req.user.id;
  const { error } = materialValidationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      status: 400,
      message: error.details[0].message,
    });
  }
  const title = req.body.title;
  const description = req.body.description;
  const type = req.body.type;
  const file_url = req.body.fileUrl;
  const uploaded_by = req.user.id;
  const gradeSubjectSemesterId = req.params.id;
  const gradeSubjectSemester = await GradeSubjectSemester.findById(
    gradeSubjectSemesterId
  );
  if (!gradeSubjectSemester) {
    return res.status(404).json({
      status: 404,
      message: "This subject is not found",
    });
  }
  const class_id = req.query.classId;
  if (!validateObjectId(class_id)) {
    return res.status(400).json({
      status: 400,
      message: "Invalid class ID",
    });
  }

  const materiel = new Material({
    title,
    description,
    type,
    file_url,
    uploaded_by,
    grade_subject_semester_id: gradeSubjectSemesterId,
    class_id,
  });
  await materiel.save();
  addRewardClaimAndUpdatePoints(teacherId, "Teacher", "Adding Material Item");
  res.status(201).json(materiel);
});
const getMaterielById = expressAsyncHandler(async (req, res) => {
  const materielId = req.params.materialId;
  console.log(materielId);

  if (validateObjectId(materielId) === false) {
    return res.status(400).json({ status: 400, message: "Invalid ID" });
  }
  const materiel = await Material.findById(materielId)
    .populate({
      path: "grade_subject_semester_id",
      populate: [
        {
          path: "grade_subject_id",
          populate: [{ path: "subjectId" }, { path: "gradeId" }],
        },
      ],
    })
    .populate("uploaded_by", "fullName");
  if (!materiel) {
    return res.status(404).json({ status: 404, message: "Materiel not found" });
  }
  if (req.user.role !== "student") {
    return res.status(200).json({
      status: 200,
      message: "Materiel retrieved successfully",
      materiel,
    });
  }
  const isBookmarked = await BookMarkForMaterial.findOne({
    student_id: req.user.id,
    material_id: materiel._id,
  });

  return res.status(200).json({
    status: 200,
    message: "Materiel retrieved successfully",
    materiel: { ...materiel.toObject(), isBookmarked: !!isBookmarked },
  });
});
const updateMateriel = expressAsyncHandler(async (req, res) => {
  const materielId = req.params.id;
  if (validateObjectId(materielId) === false) {
    return res
      .status(400)
      .json({ status: 400, message: "Invalid material ID" });
  }
  const materiel = await Material.findByIdAndUpdate(materielId, req.body, {
    new: true,
  }).populate({
    path: "grade_subject_semester_id",
    populate: [
      {
        path: "grade_subject_id",
        populate: [{ path: "subjectId" }, { path: "gradeId" }],
      },
    ],
  });
  if (!materiel) {
    return res.status(404).json({ status: 404, message: "Materiel not found" });
  }
  res
    .status(200)
    .json({ status: 200, message: "Materiel updated successfully", materiel });
});
const deleteMateriel = expressAsyncHandler(async (req, res) => {
  const teacherId = req.user.id;
  const materielId = req.params.id;
  if (validateObjectId(materielId) === false) {
    return res.status(400).json({ status: 400, message: "Invalid ID" });
  }
  const materiel = await Material.findByIdAndDelete(materielId);
  if (!materiel) {
    return res.status(404).json({ status: 404, message: "Materiel not found" });
  }
  addRewardClaimAndUpdatePoints(
    teacherId,
    "Teacher",
    "Adding Material Item",
    "subtract"
  );
  res
    .status(200)
    .json({ status: 200, message: "Materiel deleted successfully" });
});
const getAllMateriels = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  if (validateObjectId(id) === false) {
    return res.status(400).json({ status: 400, message: "Invalid ID" });
  }
  const materiels = await Material.find({
    grade_subject_semester_id: id,
  }).populate({
    path: "grade_subject_semester_id",
    populate: [
      {
        path: "grade_subject_id",
        populate: [{ path: "subjectId" }, { path: "gradeId" }],
      },
    ],
  });
  if (!materiels) {
    return res
      .status(404)
      .json({ status: 404, message: "Materiels not found" });
  }
  res.status(200).json({
    status: 200,
    message: "Materiels retrieved successfully",
    materiels,
  });
});

module.exports = {
  createMateriel,
  updateMateriel,
  deleteMateriel,
  getAllMateriels,
  getMaterielById,
};
