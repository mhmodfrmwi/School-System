const expressAsyncHandler = require("express-async-handler");
const signToken = require("../../utils/signToken");
const Admin = require("../../DB/Admin");
const bcrypt = require("bcrypt");
const fs = require("fs");

const login = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      status: 400,
      message: "Please provide email and password!",
    });
  }
  const admin = await Admin.findOne({ email }).select("+password");
  if (!admin || !(await admin.comparePasswordInDb(password, admin.password))) {
    return res.status(401).json({
      status: 401,
      message: "Incorrect email or password",
    });
  }
  const token = signToken(admin._id, admin.email, "admin");
  res.status(200).json({
    status: 200,
    message: "Logged in successfully",
    token,
    admin,
  });
});


const updateAdminProfile = async (req, res) => {
  try {
    const adminId = req.user.id;
    const { currentPassword, newPassword, phone } = req.body;
    const profileImage = req.file?.path;

    const admin = await Admin.findById(adminId);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const updateData = {};

    if (newPassword) {
      if (!currentPassword) {
        return res.status(400).json({ message: "Current password is required" });
      }

      const isMatch = await admin.comparePasswordInDb(currentPassword);
      if (!isMatch) {
        return res.status(401).json({ message: "Current password is incorrect" });
      }

      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(newPassword, salt);
    }

    if (phone) {
      updateData.phone = phone;
    }

    if (profileImage) {

      if (
        admin.profileImage &&
        !admin.profileImage.startsWith("http") &&
        fs.existsSync(admin.profileImage)
      ) {
        fs.unlinkSync(admin.profileImage);
      }
      updateData.profileImage = profileImage;
    }

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ message: "No valid fields to update" });
    }

    const updatedAdmin = await Admin.findByIdAndUpdate(
      adminId,
      updateData,
      { new: true, runValidators: true }
    ).select("-password");

    res.status(200).json({
      message: "Admin profile updated successfully",
      admin: updatedAdmin,
    });

  } catch (error) {
    console.error("Error updating admin profile:", error);

    if (req.file?.path) {
      fs.unlinkSync(req.file.path);
    }

    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: "Server error during update" });
  }
};

module.exports = {
  login,
  updateAdminProfile,
};
