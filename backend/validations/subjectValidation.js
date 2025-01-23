const Joi = require("joi");
const subjectValidationSchema = Joi.object({
  subjectName: Joi.string().required(),
});

module.exports = subjectValidationSchema;
