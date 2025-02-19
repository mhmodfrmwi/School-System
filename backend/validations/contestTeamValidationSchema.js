const Joi = require("joi");

const teamValidationSchema = Joi.object({
  teamName: Joi.string().required(),
  teammates: Joi.array()
    .items(
      Joi.object({
        fullName: Joi.string().required(),
        academic_number: Joi.string().required(),
      })
    )
    .min(1)
    .required(),
});

module.exports =  teamValidationSchema;
