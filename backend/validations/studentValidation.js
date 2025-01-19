const studentValidationSchema = Joi.object({
  academic_number: Joi.string().required(), // Academic number is required
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  date_of_birth: Joi.date().required(),
  gender: Joi.string().valid("M", "F", "O").required(),
  address: Joi.string().required(),
  phone: Joi.string().required(),
  email: Joi.string().email().required(),
  admission_date: Joi.date().required(),
  grade_id: Joi.string().required(),
  class_id: Joi.string().required(),
  academic_year_id: Joi.string().required(),
});

module.exports = studentValidationSchema;
