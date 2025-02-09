const expressAsyncHandler = require("express-async-handler");
const validateObjectId = require("../../utils/validateObjectId");
const student = require("../../DB/student");
const Material = require("../../DB/materielModel");
const BookMarkForMaterial = require("../../DB/bookMarkForMaterialModel");
const addMaterialForBookMarks = expressAsyncHandler(async (req, res) => {
  const studentId = req.user.id;
  if (!validateObjectId(studentId)) {
    return res.status(400).json({ status: 400, message: "Invalid Student ID" });
  }
  const existingStudent = await student.findById(studentId);
  if (!existingStudent) {
    return res.status(404).json({ status: 404, message: "Student not found" });
  }
  const materialId = req.params.materialId;
  if (!validateObjectId(materialId)) {
    return res
      .status(400)
      .json({ status: 400, message: "Invalid Material ID" });
  }
  const existingMaterial = await Material.findById(materialId);
  if (!existingMaterial) {
    return res.status(404).json({ status: 404, message: "Material not found" });
  }
  const existingBookmark = await BookMarkForMaterial.findOne({
    student_id: existingStudent._id,
    material_id: existingMaterial._id,
  });
  if (existingBookmark) {
    return res
      .status(400)
      .json({ status: 400, message: "Material already added to bookmarks" });
  }
  const bookmark = new BookMarkForMaterial({
    student_id: existingStudent._id,
    material_id: existingMaterial._id,
  });
  await bookmark.save();
  res.status(201).json({ status: 201, message: "Material added to bookmarks" });
});

const getAllBookmarksForStudent = expressAsyncHandler(async (req, res) => {
  const studentId = req.user.id;
  if (!validateObjectId(studentId)) {
    return res.status(400).json({ status: 400, message: "Invalid Student ID" });
  }
  const existingStudent = await student.findById(studentId);
  if (!existingStudent) {
    return res.status(404).json({ status: 404, message: "Student not found" });
  }
  const bookmarks = await BookMarkForMaterial.find(
    {
      student_id: existingStudent._id,
    },
    ["-__v", "-createdAt", "-updatedAt"]
  )
    .populate("material_id", ["-__v", "-createdAt", "-updatedAt"])
    .populate("student_id", ["-__v", "-createdAt", "-updatedAt"]);
  res.status(200).json({ status: 200, bookmarks });
});
const deleteMaterialFromBookMarks = expressAsyncHandler(async (req, res) => {
  const studentId = req.user.id;
  if (!validateObjectId(studentId)) {
    return res.status(400).json({ status: 400, message: "Invalid Student ID" });
  }
  const existingStudent = await student.findById(studentId);
  if (!existingStudent) {
    return res.status(404).json({ status: 404, message: "Student not found" });
  }
  const materialId = req.params.materialId;
  if (!validateObjectId(materialId)) {
    return res
      .status(400)
      .json({ status: 400, message: "Invalid Material ID" });
  }
  const existingBookmark = await BookMarkForMaterial.findOneAndDelete({
    student_id: existingStudent._id,
    material_id: materialId,
  });
  if (!existingBookmark) {
    return res
      .status(404)
      .json({ status: 404, message: "Material not found in bookmarks" });
  }
  res
    .status(200)
    .json({ status: 200, message: "Material deleted from bookmarks" });
});
module.exports = {
  addMaterialForBookMarks,
  deleteMaterialFromBookMarks,
  getAllBookmarksForStudent,
};
