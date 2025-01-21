const parentStudentValidationSchema = Joi.object({
  parent_id: Joi.string().required(),
  student_id: Joi.string().required(),
  academic_number: Joi.string().required(), // Add academic number
});

module.exports = parentStudentValidationSchema;
