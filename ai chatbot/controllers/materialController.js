const apiResponse = require("../utils/apiResponse");
const materialService = require("../services/materialService");
/**
 * Get material for grade
 * @route GET /api/grade
 * @access Private
 */
const getMaterial = async (req, res) => {
  try {
    const { userId, authToken } = req.user;
    const materialData = await materialService.fetchSubjectsMaterials(
      userId,
      authToken
    );
    if (!materialData) {
      return apiResponse.error(res, 404, "Material not found");
    }
    return apiResponse.success(res, 200, "Material fetched successfully", {
      materialData,
    });
  } catch (error) {
    console.error("Error fetching material:", error);
    return apiResponse.error(res, 500, "Internal server error");
  }
};
module.exports = {
  getMaterial,
};
