const expressAsyncHandler = require("express-async-handler");
const signToken = require("../../utils/signToken");
const Parent = require("../../DB/ParentModel");
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
  const parent = await Parent.findOne({ email }).select("+password");
  if (
    !parent ||
    !(await parent.comparePasswordInDb(password, parent.password))
  ) {
    return res.status(401).json({
      status: 401,
      message: "Incorrect email or password",
    });
  }
  if (parent.isVerified === false) {
    return res.status(401).json({
      status: 401,
      message: "We sent you a verification email, please verify your account",
    });
  }
  const token = signToken(parent._id, parent.email, "parent");
  res.status(200).json({
    status: 200,
    message: "Logged in successfully",
    token,
    parent,
  });
});

const updateParentProfile = async (req, res) => {
  try {
    const parentId = req.user.id;
    const { currentPassword, newPassword, phone } = req.body;
    const profileImage = req.file
      ? `http://localhost:4000/profileImages/${req.file.filename}`
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

    const parent = await Parent.findById(parentId);
    if (!parent) {
      return res.status(404).json({ message: "Parent not found" });
    }

    const updateData = {};

    if (newPassword) {
      if (!currentPassword) {
        return res
          .status(400)
          .json({ message: "Current password is required" });
      }

      const isMatch = await parent.comparePasswordInDb(
        currentPassword,
        parent.password
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
      if (parent.profileImage) {
        try {
          if (!parent.profileImage.startsWith("http")) {
            const fullPath = path.join(
              __dirname,
              "../../",
              parent.profileImage
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

    const updatedParent = await Parent.findByIdAndUpdate(parentId, updateData, {
      new: true,
      runValidators: true,
    }).select("-password");

    res.status(200).json({
      message: "Profile updated successfully",
      parent: updatedParent,
    });
  } catch (error) {
    console.error("Error updating parent profile:", error);

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
  updateParentProfile,
};
