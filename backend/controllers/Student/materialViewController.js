const expressAsyncHandler = require("express-async-handler");
const validateObjectId = require("../../utils/validateObjectId");
const MaterialView = require("../../DB/MaterialView");

const updateMaterialView = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!validateObjectId(id)) {
    return res
      .status(400)
      .json({ status: 400, message: "Invalid Material ID" });
  }

  const student_id = req.user.id;

  try {
    const materialView = await MaterialView.findOneAndUpdate(
      { material_id: id, student_id },
      { is_viewed: true, last_view_at: new Date() },
      { upsert: true, new: true }
    );

    res
      .status(200)
      .json({ status: 200, message: "Material viewed successfully" });
  } catch (error) {
    res.status(500).json({ status: 500, message: "Internal Server Error" });
  }
});

const getMaterialViewByMaterialId = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!validateObjectId(id)) {
    return res
      .status(400)
      .json({ status: 400, message: "Invalid Material ID" });
  }

  const student_id = req.user.id;

  try {
    const materialView = await MaterialView.findOne({
      material_id: id,
      student_id,
    });

    if (!materialView) {
      return res.status(404).json({
        status: 404,
        message: "Material view not found",
        material_id: id,
        student_id,
      });
    }

    res.status(200).json({
      status: 200,
      isViewed: materialView.is_viewed,
      lastViewedAt: materialView.last_view_at,
    });
  } catch (error) {
    console.error("Error fetching material view:", error);
    res.status(500).json({ status: 500, message: "Internal Server Error" });
  }
});

module.exports = {
  updateMaterialView,
  getMaterialViewByMaterialId,
};
