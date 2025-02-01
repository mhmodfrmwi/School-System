const Joi = require("joi");
const scheduleValidationSchema = Joi.object({
  className: Joi.string().required(),
  subjectName: Joi.string().required(),
  teacherName: Joi.string().required(),
  grade: Joi.string().required(),
  day: Joi.string().required(),
  startTime: Joi.string()
    .pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .required(),
  endTime: Joi.string()
    .pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .required()
    .custom((value, helpers) => {
      const start = helpers.state.ancestors[0].startTime;
      if (value <= start) {
        throw new Error("end time must be after start time");
      }
      return value;
    }),
  academicYear: Joi.string().required(),
  semesterName: Joi.string().required(),
});

module.exports = scheduleValidationSchema;
