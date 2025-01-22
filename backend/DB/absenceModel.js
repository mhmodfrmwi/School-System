const mongoose = require("mongoose");
const Joi = require("joi");

const absenceSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  isAbsent: {
    type: Boolean,
    required: true,
  },
});

const Absence = mongoose.model("Absence", absenceSchema);

const absenceValidationSchema = Joi.object({
  studentId: Joi.object().required(),
  courseId: Joi.object().required(),
  date: Joi.date().required(),
  isAbsent: Joi.boolean().required(),
}).prefs({
  messages: {
    "any.required": "This field is required.",
    "date.base": "Invalid date format.",
    "boolean.base": "Invalid boolean value.",
    "object.base": "Invalid object structure.",
  },
});

function validateAbsence(data) {
  return absenceValidationSchema.validate(data, { abortEarly: false });
}

module.exports = { Absence, validateAbsence };
