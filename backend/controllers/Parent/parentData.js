const expressAsyncHandler = require("express-async-handler");
const validateObjectId = require("../../utils/validateObjectId");
const Parent = require("../../DB/ParentModel");

const getLoggedInParentData = expressAsyncHandler(async (req, res) => {
  const parentId = req.user.id;

  if (!validateObjectId(parentId)) {
    return res.status(400).json({
      status: 400,
      message: "Invalid parent ID format",
      errorCode: "INVALID_PARENT_ID",
    });
  }

  try {
    const parent = await Parent.findById(parentId)
      .select("-password -__v -updatedAt")
      .lean();

    if (!parent) {
      return res.status(404).json({
        status: 404,
        message: "Parent account not found",
        errorCode: "PARENT_NOT_FOUND",
      });
    }

    return res.status(200).json({
      status: 200,
      message: "Parent data retrieved successfully",
      data: parent,
    });
  } catch (error) {
    console.error("Parent data fetch error:", error);
    return res.status(500).json({
      status: 500,
      message: "Error retrieving parent data",
      errorCode: "PARENT_DATA_FETCH_ERROR",
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
  getLoggedInParentData,
};
