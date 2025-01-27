const Joi = require("joi");
const parentStudentValidationSchema = Joi.object({
  parentName: Joi.string().required(),
  studentAcademicNumber: Joi.string().required(),
});

module.exports = parentStudentValidationSchema;
