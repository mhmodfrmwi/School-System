const attendanceValidationSchema = Joi.object({
  student_id: Joi.string().required(),
  academic_number: Joi.string().required(), // Add academic number
  class_id: Joi.string().required(),
  date: Joi.date().required(),
  status: Joi.string().valid("P", "A", "L").required(),
});

module.exports = attendanceValidationSchema;
