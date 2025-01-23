const Joi = require("joi");
const gradeValidationSchema = Joi.object({
  gradeName: Joi.string().required(),
  academicYear: Joi.string().required(),
  className: Joi.string().required(),
});

module.exports = gradeValidationSchema;
