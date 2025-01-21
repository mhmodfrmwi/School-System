const gradeValidationSchema = Joi.object({
  grade_name: Joi.string().required(),
});

module.exports = gradeValidationSchema;
