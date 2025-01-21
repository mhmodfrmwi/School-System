const classTeacherValidationSchema = Joi.object({
  class_id: Joi.string().required(),
  subject_id: Joi.string().required(),
  teacher_id: Joi.string().required(),
  academic_year_id: Joi.string().required(),
});

module.exports = classTeacherValidationSchema;
