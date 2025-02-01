const Joi = require('joi');

const questionValidationSchema = Joi.object({
  questionType: Joi.string()
    .valid('MCQ', 'True/False', 'Short Answer', 'Essay')
    .required(),
  questionText: Joi.string()
    .required(),
  subjectName: Joi.string()
    .required(),
  gradeName: Joi.string()
    .required(),
  semesterName: Joi.string()
    .required(),
  teacherName: Joi.string()
    .required(),
  answer: Joi.string()
    .required(),
});

module.exports = questionValidationSchema;
