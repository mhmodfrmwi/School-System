const Joi = require("joi");
const materielValidationSchema = Joi.object({
  title: Joi.string().required(),
  type: Joi.string().required(),
  grade: Joi.string().required(),
  academicYear: Joi.string().email().required(),
  subject: Joi.string().required(),
  password: Joi.string().min(6).required(),
  file: Joi.file().required(),
});

module.exports = materielValidationSchema;
