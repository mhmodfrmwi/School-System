const Joi = require("joi");

const adminValidationSchema = Joi.object({
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(), // Minimum password length
  phone: Joi.string().required(),
  role: Joi.string().valid("admin").default("admin"), // Role is fixed as 'admin'
});

module.exports = adminValidationSchema;
