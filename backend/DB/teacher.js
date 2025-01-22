// models/Teacher.js
const mongoose = require("mongoose");
const Joi = require("joi");
const path = require("path");
// Define Teacher Schema
const teacherSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 3, maxlength: 30 },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  SSN: { type: String, required: true },
  themePreference: {
    type: String,
    enum: ["light", "dark"],
    default: "light",
  },
  notificationsEnabled: { type: Boolean, default: true },
  subject: { type: String, required: true },
  experience: { type: Number, min: 0 },
  profileImage: {
    type: String,
    default:
      "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?t=st=1733078248~exp=1733081848~hmac=e2eec059dc2217f905388f452eaf9dee7d9679765c2b0ac7f273a5cfe7cd4bde&w=740",
  },
  phone: {
    type: String,
    required: true,
  },
  classes: {
    type: [],
  },
  gender: {
    type: String,
    required: true,
    enum: ["Male", "Female"],
  },
});

// Joi Validation for Teacher
const validateTeacher = (obj) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required().messages({
      "string.base": "Name must be a string.",
      "string.min": "Name must be at least 3 characters long.",
      "string.max": "Name cannot exceed 30 characters.",
      "any.required": "Name is required.",
    }),
    email: Joi.string().email().required().messages({
      "string.email": "Email must be a valid email address.",
      "any.required": "Email is required.",
    }),
    password: Joi.string().required().messages({
      "any.required": "Password is required.",
    }),
    SSN: Joi.string()
      .pattern(/^\d{14}$/)
      .required()
      .messages({
        "any.required": "SSN is required.",
      }),
    themePreference: Joi.string().valid("light", "dark").default("light"),
    notificationsEnabled: Joi.boolean().default(true),
    subject: Joi.string().required(),
    role: Joi.string().valid("Teacher").required(),
    experience: Joi.number().min(0).messages({
      "number.base": "Experience must be a non-negative number.",
    }),
    gender: Joi.string().required(),
    phone: Joi.string().required(),
    classes: Joi.array().required(),
  });

  return schema.validate(obj);
};

// Exporting the Model and Validation Function
module.exports = {
  Teacher: mongoose.model("Teacher", teacherSchema),
  validateTeacher,
};
