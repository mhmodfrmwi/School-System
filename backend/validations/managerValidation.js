const Joi = require("joi");
const managerValidationSchema = Joi.object({
  fullName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  phone: Joi.string().required(),
  gender: Joi.string().valid("M", "F", "O").required(),
});

module.exports = managerValidationSchema;
