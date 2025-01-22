const mongoose = require("mongoose");
const Joi = require("joi");
const path = require("path");
const teacher = require("./teacher");

const schedualSchema = new mongoose.Schema({
  subjectName: {
    type: String,
    required: true,
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Teacher",
  },
  day: {
    type: String,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  class: {
    type: String,
    required: true,
  },
  grade: {
    type: Number,
    required: true,
    min: 1,
    max: 12,
  },
});

const validateSchedualForm = (obj) => {
  const schema = Joi.object({
    subjectName: Joi.string().required(),
    day: Joi.string().required(),
    startTime: Joi.string().required(),
    endTime: Joi.string().required(),
    class: Joi.string().required(),
    grade: Joi.number().min(1).max(12).required(),
    teacher: Joi.required(),
    SSN: Joi.string().required(),
  });
  return schema.validate(obj);
};

const Schedual = mongoose.model("Schedual", schedualSchema);

module.exports = {
  Schedual,
  validateSchedualForm,
};
