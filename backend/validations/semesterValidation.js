const semesterValidationSchema = Joi.object({
  semester_name: Joi.string().required(),
  academic_year_id: Joi.string().required(),
});

module.exports = semesterValidationSchema;
