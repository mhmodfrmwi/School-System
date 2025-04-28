const expressAsyncHandler = require("express-async-handler");
const validateObjectId = require("../../utils/validateObjectId");
const Manager = require("../../DB/managerModel");

const getLoggedInManagerData = expressAsyncHandler(async (req, res) => {
  const managerId = req.user.id;

  if (!validateObjectId(managerId)) {
    return res.status(400).json({ 
      status: 400, 
      message: "Invalid manager ID format" 
    });
  }

  try {
    const manager = await Manager.findById(managerId)
      .select("-password -__v")
      .lean();

    if (!manager) {
      return res.status(404).json({
        status: 404,
        message: "Manager account not found",
      });
    }


    return res.status(200).json({
      status: 200,
      message: "Manager data retrieved successfully",
      data: manager
    });

  } catch (error) {
    console.error("Manager data fetch error:", error);
    return res.status(500).json({
      status: 500,
      message: "Error retrieving manager data",
      error: process.env.NODE_ENV === "development" ? error.message : undefined
    });
  }
});

module.exports = {
  getLoggedInManagerData,
};