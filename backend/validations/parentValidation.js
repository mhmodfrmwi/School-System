const parentValidationSchema = Joi.object({
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  phone: Joi.string().required(),
  email: Joi.string().email().required(),
});

module.exports = parentValidationSchema;
