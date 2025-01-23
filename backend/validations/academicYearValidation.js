const Joi = require("joi");

const academicYearValidationSchema = Joi.object({
  startYear: Joi.number().max(2100).min(2000).required(),
  endYear: Joi.number().max(2100).min(2000).required(),
});

module.exports = academicYearValidationSchema;
