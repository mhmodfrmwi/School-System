const Joi = require("joi");
const gradeSubjectValidationSchema = Joi.object({
  subjectName: Joi.string().required(),
  gradeName: Joi.string().required(),
  academicYear: Joi.string().required(),
});

module.exports = gradeSubjectValidationSchema;
