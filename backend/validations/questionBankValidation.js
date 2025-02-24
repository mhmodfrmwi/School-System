const Joi = require('joi');

const questionValidationSchema = Joi.object({
  questionType: Joi.string()
    .valid('MCQ', 'True/False', 'Short Answer', 'Essay')
    .required(),
  questionText: Joi.string()
    .required(),
  answer: Joi.string()
    .required(),
  choices: Joi.array()
    .items(Joi.string())
    .when('questionType', {
      is: 'MCQ',
      then: Joi.array().required(),
      otherwise: Joi.array().optional()
    })
});

module.exports = questionValidationSchema;