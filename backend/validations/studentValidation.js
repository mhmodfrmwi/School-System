const Joi = require("joi");

const studentValidationSchema = Joi.object({
  fullName: Joi.string().required(), // Full name as a single string
  emailAddress: Joi.string().email().required(), // Email address validation
  phoneNumber: Joi.string().required(), // Phone number validation
  password: Joi.string().min(6).required(), // Password with a minimum length of 6
  dateOfBirth: Joi.date().required(), // Date of birth validation
  gender: Joi.string().valid("M", "F", "O").required(), // Gender validation
  grade: Joi.string().required(), // Grade name validation
  address: Joi.string().required(), // Address validation
});

module.exports = studentValidationSchema;

/*const Joi = require("joi");
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

module.exports = studentValidationSchema;*/
