const expressAsyncHandler = require("express-async-handler");
const signToken = require("../../utils/signToken");
const Manager = require("../../DB/managerModel");
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
  const manager = await Manager.findOne({ email }).select("+password");
  if (
    !manager ||
    !(await manager.comparePasswordInDb(password, manager.password))
  ) {
    return res.status(401).json({
      status: 401,
      message: "Incorrect email or password",
    });
  }
  if (manager.isVerified === false) {
    return res.status(401).json({
      status: 401,
      message: "We sent you a verification email, please verify your account",
    });
  }
  const token = signToken(manager._id, manager.email, "manager");
  res.status(200).json({
    status: 200,
    message: "Logged in successfully",
    token,
    manager,
  });
});

const updateManagerProfile = async (req, res) => {
  try {
    const managerId = req.user.id;
    const { currentPassword, newPassword, phone } = req.body;
    const profileImage = req.file
      ? `${process.env.IMAGE_URL}/profileImages/${req.file.filename}`
      : undefined;

    if (!newPassword && !phone && !profileImage) {
      if (req.file?.path) fs.unlinkSync(req.file.path);
      return res.status(400).json({
        message:
          "Please provide fields to update (newPassword, phone, or profileImage)",
        details: {
          note: "For password change, include both currentPassword and newPassword",
          note2: "For profile image, use form-data with 'profileImage' field",
        },
      });
    }

    const manager = await Manager.findById(managerId);
    if (!manager) {
      return res.status(404).json({ message: "Manager not found" });
    }

    const updateData = {};

    if (newPassword) {
      if (!currentPassword) {
        return res
          .status(400)
          .json({ message: "Current password is required" });
      }

      const isMatch = await manager.comparePasswordInDb(
        currentPassword,
        manager.password
      );
      if (!isMatch) {
        return res
          .status(401)
          .json({ message: "Current password is incorrect" });
      }

      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(newPassword, salt);
    }

    if (phone) {
      updateData.phone = phone;
    }

    if (profileImage) {
      if (manager.profileImage) {
        try {
          if (!manager.profileImage.startsWith("http")) {
            const fullPath = path.join(
              __dirname,
              "../../",
              manager.profileImage
            );
            if (fs.existsSync(fullPath)) {
              fs.unlinkSync(fullPath);
            }
          }
        } catch (err) {
          console.error("Error deleting old profile image:", err);
        }
      }
      updateData.profileImage = profileImage;
    }
    const updatedManager = await Manager.findByIdAndUpdate(
      managerId,
      updateData,
      { new: true, runValidators: true }
    ).select("-password");

    res.status(200).json({
      message: "Profile updated successfully",
      manager: updatedManager,
    });
  } catch (error) {
    console.error("Error updating manager profile:", error);

    if (req.file && req.file.path) {
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
  updateManagerProfile,
};
