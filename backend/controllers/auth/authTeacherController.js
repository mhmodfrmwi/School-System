const expressAsyncHandler = require("express-async-handler");
const signToken = require("../../utils/signToken");
const Teacher = require("../../DB/teacher");
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
    const profileImage = req.file?.path;

    const teacher = await Teacher.findById(teacherId);
    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }


    const updateData = {};

    if (newPassword) {
      if (!currentPassword) {
        return res.status(400).json({ message: "Current password is required" });
      }

      const isMatch = await teacher.comparePasswordInDb(
        currentPassword,
        teacher.password
      );
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
        teacher.profileImage &&
        !teacher.profileImage.startsWith("http") &&
        fs.existsSync(teacher.profileImage)
      ) {
        fs.unlinkSync(teacher.profileImage);
      }
      updateData.profileImage = profileImage;
    }

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ message: "No fields to update" });
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
  updateTeacherProfile,
};
