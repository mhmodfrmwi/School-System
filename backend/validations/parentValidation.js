const Joi = require("joi");
const parentValidationSchema = Joi.object({
  fullName: Joi.string().required(),
  phone: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  gender: Joi.string().valid("M", "F", "O").required(),
  students: Joi.array().required(),
});

module.exports = parentValidationSchema;
