const mongoose = require("mongoose");
const Joi = require("joi");

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  term: {
    type: String,
    enum: ["term 1", "term 2"],
    required: true,
  },
  grade: {
    type: Number,
    required: true,
  },
  // scheduleId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   required: true,
  //   ref: "Schedule",
  // },
});

const Course = mongoose.model("Course", courseSchema);

const courseValidationSchema = Joi.object({
  name: Joi.string().required(),
  term: Joi.string().required(),
  grade: Joi.number().integer().required(),
  // scheduleId: Joi.object().required(),
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
