const expressAsyncHandler = require("express-async-handler");
const Student = require("../../DB/StudentModel");
const signToken = require("../../utils/signToken");
const bcrypt = require("bcrypt");
const fs = require("fs");
const path = require("path");

const login = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check if email and password exist
  if (!email || !password) {
    return res.status(400).json({
      status: 400,
      message: "Please provide email and password!",
    });
  }
  // Check if user exists && password is correct
  const student = await Student.findOne({ email }).select("+password");

  if (
    !student ||
    !(await student.comparePasswordInDb(password, student.password))
  ) {
    return res.status(401).json({
      status: 401,
      message: "Incorrect email or password",
    });
  }

  // If everything ok, send token to client
  const token = signToken(
    student._id,
    student.email,
    "student",
    student.classId
  );

  res.status(200).json({
    status: 200,
    token,
    message: "Login successful",
    student,
  });
});

const updateStudentProfile = expressAsyncHandler(async (req, res) => {
  try {
    const studentId = req.user.id;
    const { currentPassword, newPassword, phone } = req.body;
    let profileImage = req.file
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

    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const updateData = {};

    if (newPassword) {
      if (!currentPassword) {
        return res
          .status(400)
          .json({
            message: "Current password is required to set a new password",
          });
      }

      const isMatch = await student.comparePasswordInDb(
        currentPassword,
        student.password
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
      if (student.profileImage) {
        try {
          if (!student.profileImage.startsWith("http")) {
            const fullPath = path.join(
              __dirname,
              "../../",
              student.profileImage
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

    const updatedStudent = await Student.findByIdAndUpdate(
      studentId,
      updateData,
      { new: true, runValidators: true }
    ).select("-password");

    res.status(200).json({
      message: "Profile updated successfully",
      student: updatedStudent,
    });
  } catch (error) {
    console.error("Error updating student profile:", error);
    if (req.file && req.file.path) {
      fs.unlinkSync(req.file.path);
    }

    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }

    res.status(500).json({ message: "Server error while updating profile" });
  }
});

module.exports = {
  login,
  updateStudentProfile,
};
