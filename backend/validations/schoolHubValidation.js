const Joi = require("joi");

const schoolHubValidationSchema = Joi.object({
  title: Joi.string().required(),
  registrationStart: Joi.date().required(),
  registrationEnd: Joi.date().greater(Joi.ref("registrationStart")).required(),
  contestDate: Joi.date().greater(Joi.ref("registrationEnd")).required(),
  location: Joi.string().required(),
  details: Joi.string().required(),
  prizes: Joi.array().items(Joi.string()).required(),
});

module.exports = schoolHubValidationSchema;