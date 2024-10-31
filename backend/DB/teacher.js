const mongoose = require("mongoose");
const Joi = require("joi");

// Define Teacher Schema
const teacherSchema = new mongoose.Schema({
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  department: {
    type: String,
    required: true,
    trim: true,
  },
  score: {
    type: Number,
    default: 0,
    min: 0,
    max: 100,
  },
});

// Joi Validation for Teacher
const validateTeacher = (obj) => {
  const schema = Joi.object({
    teacherId: Joi.string().required().messages({
      "string.base": "Teacher ID must be a valid ObjectId string.",
      "any.required": "Teacher ID is required.",
    }),

    department: Joi.string().required().messages({
      "string.base": "Department must be a string.",
      "any.required": "Department is required.",
    }),
  });

  return schema.validate(obj);
};

// Exporting the Model and Validation Function
module.exports = {
  Teacher: mongoose.model("Teacher", teacherSchema),
  validateTeacher,
};
