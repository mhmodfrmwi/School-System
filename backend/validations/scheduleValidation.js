const scheduleValidationSchema = Joi.object({
  class_id: Joi.string().required(),
  subject_id: Joi.string().required(),
  teacher_id: Joi.string().required(),
  day_of_week: Joi.string().required(),
  start_time: Joi.string().required(),
  end_time: Joi.string().required(),
  academic_year_id: Joi.string().required(),
});

module.exports = scheduleValidationSchema;
