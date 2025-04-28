const expressAsyncHandler = require("express-async-handler");
const validateObjectId = require("../../utils/validateObjectId");
const Admin = require("../../DB/Admin");

const getLoggedInAdminData = expressAsyncHandler(async (req, res) => {
  const adminId = req.user.id;

  if (!validateObjectId(adminId)) {
    return res.status(400).json({ 
      status: 400, 
      message: "Invalid admin ID" 
    });
  }

  try {
    const admin = await Admin.findById(adminId)
      .select("-password -__v")
      .lean();

    if (!admin) {
      return res.status(404).json({
        status: 404,
        message: "Admin not found",
      });
    }

    const response = {
      status: 200,
      message: "Admin data retrieved successfully",
      data: admin
    };

    return res.status(200).json(response);

  } catch (error) {
    console.error("Error fetching admin data:", error);
    return res.status(500).json({
      status: 500,
      message: "Internal server error while fetching admin data",
      error: process.env.NODE_ENV === "development" ? error.message : undefined
    });
  }
});

module.exports = {
  getLoggedInAdminData
};