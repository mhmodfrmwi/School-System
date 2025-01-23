const Joi = require("joi");

const adminValidationSchema = Joi.object({
  fullName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  phone: Joi.string().required(),
  role: Joi.string().valid("admin").default("admin"),
  gender: Joi.string().valid("M", "F", "O").required(),
});

module.exports = adminValidationSchema;
