const mongoose = require("mongoose");
const Joi = require("joi");
// Define User Schema
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, minlength: 3, maxlength: 30 },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    SSN: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["Teacher", "Student", "Parent", "Boss", "Admin"],
      required: true,
    },
    themePreference: {
      type: String,
      enum: ["light", "dark"],
      default: "light",
    },
    notificationsEnabled: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const validateRegistration = (obj) => {
  const schema = Joi.object({
    name: Joi.string().alphanum().min(3).max(30).required(),

    password: Joi.string()
      .min(8)
      .pattern(
        new RegExp(
          "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$"
        )
      )
      .required()
      .messages({
        "string.pattern.base":
          "Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character.",
      }),

    repeat_password: Joi.valid(Joi.ref("password")).required(),

    birth_year: Joi.number()
      .integer()
      .min(1900)
      .max(new Date().getFullYear() - 10)
      .required(),

    email: Joi.string().email(),

    SSN: Joi.string()
      .pattern(/^\d{14}$/)
      .required(),

    role: Joi.string()
      .valid("Teacher", "Student", "Parent", "Boss", "Admin")
      .required(),
  });
  return schema.validate(obj);
};

const validateLogin = (obj) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });
  return schema.validate(obj);
};

const User = mongoose.model("User", userSchema);

module.exports = {
  User,
  validateRegistration,
  validateLogin,
};
