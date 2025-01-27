const Joi = require('joi');

const contestValidationSchema = Joi.object({
  title: Joi.string()
    .required(),
  registrationStart: Joi.date()
    .required(),
  registrationEnd: Joi.date()
    .greater(Joi.ref('registrationStart'))
    .required(),
  details: Joi.string()
    .required(),
  prizes: Joi.array()
    .items(Joi.string())
    .required(),
});

module.exports = contestValidationSchema;
