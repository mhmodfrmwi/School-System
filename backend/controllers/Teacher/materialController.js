const expressAsyncHandler = require("express-async-handler");
const validateObjectId = require("../../utils/validateObjectId");
const Material = require("../../DB/materielModel");
const createMateriel = expressAsyncHandler(async (req, res) => {
  const materiel = new Material({
    title: "Material Title",
    type: "PDF",
    file_url: "https://example.com/file.pdf",
    uploaded_by: "67976ba2f6f371ca7d70bebc",
    grade_id: "679740f68d961b95fd40336d",
    subject_id: "679b7db6b6342ce0ddec8ac5",
    academic_year_id: "6797c7ce7bc3c3da0e665743",
    semester_id: "6797ccab7d084dac1b81dfce",
  });
  await materiel.save();
  res.status(201).json(materiel);
});
const updateMateriel = expressAsyncHandler(async (req, res) => {});
const deleteMateriel = expressAsyncHandler(async (req, res) => {});
const getMaterielById = expressAsyncHandler(async (req, res) => {});
const getAllMateriels = expressAsyncHandler(async (req, res) => {});

module.exports = {
  createMateriel,
  updateMateriel,
  deleteMateriel,
  getMaterielById,
  getAllMateriels,
};
