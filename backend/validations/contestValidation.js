const Joi = require("joi");

const contestValidationSchema = Joi.object({
  title: Joi.string().required(),
  startDate: Joi.date().required(),
  endDate: Joi.date().greater(Joi.ref("startDate")).required(),
  numberOfTeamMembers: Joi.number().required(),
  requirements: Joi.string().required(),
  subjectName: Joi.string().required(),
  className: Joi.string().required(),
  gradeName: Joi.string().required(),
});

module.exports = contestValidationSchema;
