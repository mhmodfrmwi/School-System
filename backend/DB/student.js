const mongoose = require("mongoose");
const Joi = require("joi");
const path = require("path");

// Define Student Schema
const studentSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  profileImage: {
    type: String,
    default: path.join(__dirname, "../images/student.png"),
  },
  academicYear: { type: Number, required: true, min: 1, max: 12 },
  class: { type: String, required: true },
  score: { type: Number, default: 0, min: 0 },
  order: { type: Number, min: 1 },
});

const validateStudent = (obj) => {
  const schema = Joi.object({
    studentId: Joi.string().required(),

    academicYear: Joi.number().integer().min(1).max(12).required().messages({
      "number.base": "Academic year must be a number.",
      "number.min": "Academic year must be at least 1.",
      "number.max": "Academic year must be at most 12.",
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
      "number.base": "Order must be a number.",
      "number.min": "Order must be at least 1.",
    }),
  });

  return schema.validate(obj);
};
const Student = mongoose.model("Student", studentSchema);
module.exports = {
  Student,
  validateStudent,
};
