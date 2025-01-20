const Joi = require("joi");
const semesterValidationSchema = Joi.object({
  semesterName: Joi.string().required(),
  academicYear: Joi.string().required(),
});

module.exports = semesterValidationSchema;
