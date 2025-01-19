const gradeSubjectValidationSchema = Joi.object({
  subject_id: Joi.string().required(),
  grade_id: Joi.string().required(),
  academic_year_id: Joi.string().required(),
});

module.exports = gradeSubjectValidationSchema;
