// models/Student.js
const mongoose = require("mongoose");
const Joi = require("joi");
const path = require("path");

// Define Student Schema
const studentSchema = new mongoose.Schema({
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
  profileImage: {
    type: String,
    default: path.join(__dirname, "../images/student.png"),
  },
  gender: {
    type: String,
    required: true,
    enum: ["Male", "Female"],
  },
  academicYear: { type: Number, required: true, min: 1, max: 12 },
  class: { type: String, required: true },
  score: { type: Number, default: 0, min: 0 },
  order: { type: Number, min: 1 },
});

// Joi Validation for Student
const validateStudent = (obj) => {
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
    academicYear: Joi.number().integer().min(1).max(12).required().messages({
      "number.base": "Academic year must be a number.",
      "number.min": "Academic year must be at least 1.",
      "number.max": "Academic year must be at most 12.",
      "any.required": "Academic year is required.",
    }),
    class: Joi.string().required().messages({
      "string.base": "Class must be a string.",
      "any.required": "Class is required.",
    }),
    score: Joi.number().min(0).max(100).messages({
      "number.min": "Score cannot be less than 0.",
      "number.max": "Score cannot exceed 100.",
    }),
    order: Joi.number().integer().min(1).messages({
      "number.base": "Order must be a positive integer.",
      "number.min": "Order must be at least 1.",
    }),
    role: Joi.string().valid("Student").required(),
    gender: Joi.string().required(),
  });

  return schema.validate(obj);
};

// Exporting the Model and Validation Function
const Student = mongoose.model("Student", studentSchema);
module.exports = {
  Student,
  validateStudent,
};
