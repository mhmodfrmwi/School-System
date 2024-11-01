const mongoose = require("mongoose");
const Joi = require("joi");

const schoolSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  bossId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

const School = mongoose.model("School", schoolSchema);

const schoolValidationSchema = Joi.object({
  name: Joi.string().required(),
  bossId: Joi.object().required(),
  adminId: Joi.object().required(),
}).prefs({
  messages: {
    "any.required": "This field is required.",
    "object.base": "Invalid object structure.",
  },
});

function validateSchool(data) {
  return schoolValidationSchema.validate(data, { abortEarly: false });
}

module.exports = { School, validateSchool };
