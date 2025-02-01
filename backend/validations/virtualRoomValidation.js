const Joi = require('joi');

const virtualRoomValidationSchema = Joi.object({
  title: Joi.string().required(),
  subjectName: Joi.string().required(),
  academicYear: Joi.string().required(),
  grade: Joi.string().required(),
  semester: Joi.string().required(),
  startTime: Joi.date().required(),
  duration: Joi.number().required(),
  link: Joi.string().uri().required(),
});

module.exports = virtualRoomValidationSchema;