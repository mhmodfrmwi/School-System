const Joi = require("joi");

const studentValidationSchema = Joi.object({
  fullName: Joi.string().required(),
  emailAddress: Joi.string().email().required(),
  phoneNumber: Joi.string().required(),
  password: Joi.string().min(6).required(),
  dateOfBirth: Joi.date().required(),
  gender: Joi.string().valid("M", "F", "O").required(),
  grade: Joi.string().required(),
  address: Joi.string().required(),
});

module.exports = studentValidationSchema;
