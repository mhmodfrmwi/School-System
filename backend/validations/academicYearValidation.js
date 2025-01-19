const Joi = require("joi");

const academicYearValidationSchema = Joi.object({
  year_name: Joi.string().required(),
  start_date: Joi.date().required(),
  end_date: Joi.date().required(),
});

module.exports = academicYearValidationSchema;
