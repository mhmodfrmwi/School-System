const studentGradeValidationSchema = Joi.object({
  student_id: Joi.string().required(),
  academic_number: Joi.string().required(), // Add academic number
  class_id: Joi.string().required(),
  subject_id: Joi.string().required(),
  grade: Joi.string().required(),
  exam_date: Joi.date().required(),
});

module.exports = studentGradeValidationSchema;
