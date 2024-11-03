// models/Parent.js
const mongoose = require("mongoose");
const Joi = require("joi");
// Define Parent Schema
const parentSchema = new mongoose.Schema({
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
  order: { type: Number, min: 1 },
  sons: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
});

// Joi Validation for Parent
const validateParent = (obj) => {
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
    order: Joi.number().integer().min(1).messages({
      "number.base": "Order must be a positive integer.",
      "number.min": "Order must be at least 1.",
    }),
    role: Joi.string().valid("Parent").required(),
    sons: Joi.array(),
  });

  return schema.validate(obj);
};

// Exporting the Model and Validation Function
module.exports = {
  Parent: mongoose.model("Parent", parentSchema),
  validateParent,
};
