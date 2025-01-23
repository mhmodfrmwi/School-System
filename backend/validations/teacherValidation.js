const Joi = require("joi");
const teacherValidationSchema = Joi.object({
  fullName: Joi.string().required(),
  dateOfBirth: Joi.string().required(),
  gender: Joi.string().valid("M", "F", "O").required(),
  address: Joi.string().required(),
  phone: Joi.string().required(),
  email: Joi.string().email().required(),
  subject: Joi.string().required(),
  password: Joi.string().min(6).required(),
});

module.exports = teacherValidationSchema;
