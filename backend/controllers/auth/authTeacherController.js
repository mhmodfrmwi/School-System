const expressAsyncHandler = require("express-async-handler");
const signToken = require("../../utils/signToken");
const Teacher = require("../../DB/TeacherModel");
const bcrypt = require("bcrypt");
const fs = require("fs");
const path = require("path");

const login = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      status: 400,
      message: "Please provide email and password!",
    });
  }
  const teacher = await Teacher.findOne({ email }).select("+password");
  if (
    !teacher ||
    !(await teacher.comparePasswordInDb(password, teacher.password))
  ) {
    return res.status(401).json({
      status: 401,
      message: "Incorrect email or password",
    });
  }
  const token = signToken(teacher._id, teacher.email, "teacher");
  res.status(200).json({
    status: 200,
    message: "Logged in successfully",
    token,
    teacher,
  });
});

const updateTeacherProfile = async (req, res) => {
  try {
    const teacherId = req.user.id;
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

    const teacher = await Teacher.findById(teacherId);
    if (!teacher) {
      if (req.file?.path) fs.unlinkSync(req.file.path);
      return res.status(404).json({ message: "Teacher not found" });
    }

    const updateData = {};

    if (newPassword) {
      if (!currentPassword) {
        return res.status(400).json({
          message: "Current password is required when changing password",
        });
      }

      const isMatch = await teacher.comparePasswordInDb(
        currentPassword,
        teacher.password
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
      if (teacher.profileImage) {
        try {
          if (!teacher.profileImage.startsWith("http")) {
            const fullPath = path.join(
              __dirname,
              "../../",
              teacher.profileImage
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

    const updatedTeacher = await Teacher.findByIdAndUpdate(
      teacherId,
      updateData,
      { new: true, runValidators: true }
    ).select("-password");

    res.status(200).json({
      message: "Profile updated successfully",
      teacher: updatedTeacher,
    });
  } catch (error) {
    console.error("Error updating teacher profile:", error);

    if (req.file?.path) {
      try {
        fs.unlinkSync(req.file.path);
      } catch (err) {
        console.error("Error deleting uploaded file:", err);
      }
    }

    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: "Server error during update" });
  }
};

module.exports = {
  login,
  updateTeacherProfile,
};
