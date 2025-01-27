const Joi = require('joi');

const tripValidationSchema = Joi.object({
  title: Joi.string().required(),
  coach: Joi.string().required(),
  startDate: Joi.date().required(),
  endDate: Joi.date().greater(Joi.ref('startDate')).required(),
  numberOfSeats: Joi.number().required(),
  fees: Joi.number().required(),
  requirements: Joi.string().required(),
});

module.exports = tripValidationSchema;
