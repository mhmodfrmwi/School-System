const mongoose = require("mongoose");
const Joi = require("joi");

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  term: {
    type: String,
    enum: ["First", "Second"],
    required: true,
  },
  year: {
    type: Number,
    min: 1900,
    max: 2100,
    required: true,
  },
  scheduleId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Schedule",
  },
});

const Course = mongoose.model("Course", courseSchema);

const courseValidationSchema = Joi.object({
  name: Joi.string().required(),
  term: Joi.string().valid(["First", "Second"]).required(),
  year: Joi.number().integer().min(1900).max(2100).required(),
  scheduleId: Joi.object().required(),
}).prefs({
  messages: {
    "any.required": "This field is required.",
    "object.base": "Invalid object structure.",
  },
});

function validateCourse(data) {
  return courseValidationSchema.validate(data, { abortEarly: false });
}

module.exports = { Course, validateCourse };
