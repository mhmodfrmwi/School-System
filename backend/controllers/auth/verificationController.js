const Admin = require("../../DB/AdminModel");
const Manager = require("../../DB/managerModel");
const Parent = require("../../DB/ParentModel");
const StudentModel = require("../../DB/StudentModel");
const Teacher = require("../../DB/TeacherModel");
const {
  verifyToken,
  createVerificationToken,
} = require("../../utils/verificationToken");
const createVerification = async (req, res) => {
  try {
    const { model, email } = req.body;
    if (!model || !email) {
      return res.status(400).json({ message: "Model and email are required" });
    }
    const modelMap = {
      Admin,
      Student: StudentModel,
      Parent,
      Teacher,
      Manager,
    };
    const UserModel = modelMap[model];
    if (!UserModel) {
      return res.status(400).json({ message: "Invalid user option" });
    }
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const verificationResult = await createVerificationToken(
      user._id,
      model,
      email
    );
    return res.status(200).json({ message: verificationResult });
  } catch (error) {
    console.error("Error in createVerification:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
const verifyUser = async (req, res) => {
  try {
    const { userId, token } = req.params;
    if (!userId || !token) {
      return res.status(400).json({ message: "Invalid request parameters" });
    }
    const verificationResult = await verifyToken(userId, token);
    if (verificationResult !== "Your email has been verified successfully") {
      return res.status(400).json({ message: verificationResult });
    }
    return res.status(200).json({ message: verificationResult });
  } catch (error) {
    console.error("Error in verifyUser:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
module.exports = {
  createVerification,
  verifyUser,
};
