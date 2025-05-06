const crypto = require("crypto");
const VerificationToken = require("../DB/VerificationTokenModel");
const sendEmail = require("./sendEmail");
const Admin = require("../DB/AdminModel");
const StudentModel = require("../DB/StudentModel");
const Parent = require("../DB/ParentModel");
const Teacher = require("../DB/TeacherModel");
const Manager = require("../DB/managerModel");
const createVerificationToken = async (userId, model, email) => {
  try {
    const token = crypto.randomBytes(32).toString("hex");
    const verificationToken = new VerificationToken({
      userId,
      model,
      token,
    });
    await verificationToken.save();
    const verificationLink = `${process.env.DOMAIN_LINK}/users/${userId}/verify/${token}`;
    const htmlTemplate = `<h1>Verify your email</h1><p>Click <a href="${verificationLink}">here</a> to verify your email.</p>`;
    const subject = "Email Verification";
    await sendEmail(email, subject, htmlTemplate);
    return "Verification email sent successfully";
  } catch (error) {
    console.error("Error creating verification token:", error);
    throw new Error("Failed to create verification token");
  }
};

const verifyToken = async (userId, token) => {
  try {
    const verificationToken = await VerificationToken.findOne({
      userId,
      token,
    });

    if (!verificationToken) {
      return "Invalid verification token";
    }

    const modelMap = {
      Admin,
      Student: StudentModel,
      Parent,
      Teacher,
      Manager,
    };

    const UserModel = modelMap[verificationToken.model];

    if (!UserModel) {
      throw new Error(`Unknown user model: ${verificationToken.model}`);
    }

    const user = await UserModel.findById(verificationToken.userId);

    if (!user) {
      throw new Error(
        `${verificationToken.model} with ID ${verificationToken.userId} not found`
      );
    }

    user.isVerified = true;
    await user.save();

    await verificationToken.deleteOne();

    return "Your email has been verified successfully";
  } catch (error) {
    console.error("Error verifying token:", error);
    throw new Error(`Failed to verify token: ${error.message}`);
  }
};
module.exports = { createVerificationToken, verifyToken };
