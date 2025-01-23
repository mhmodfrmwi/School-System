const Joi = require("joi");
const gradeValidationSchema = Joi.object({
  gradeName: Joi.string().required(),
});

module.exports = gradeValidationSchema;
