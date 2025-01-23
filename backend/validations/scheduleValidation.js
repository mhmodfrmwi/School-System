const Joi = require("joi");
const scheduleValidationSchema = Joi.object({
  className: Joi.string().required(),
  subjectName: Joi.string().required(),
  teacherName: Joi.string().required(),
  grade: Joi.string().required(),
  day: Joi.string().required(),
  startTime: Joi.string().required(),
  endTime: Joi.string().required(),
  academicYear: Joi.string().required(),
});

module.exports = scheduleValidationSchema;
