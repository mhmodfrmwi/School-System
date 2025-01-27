const Joi = require("joi");

const gradeValidationSchema = Joi.object({
  gradeName: Joi.string()
    .regex(/^Grade \d+$/)
    .required()
    .custom((value, helpers) => {
      const number = parseInt(value.split(" ")[1], 10);

      if (number >= 15) {
        return helpers.error("number.lessThan15", { value });
      }

      return value;
    })
    .messages({
      "string.pattern.base":
        'Grade name must start with "Grade" followed by a number, e.g., "Grade 2"',
      "number.lessThan15": "Grade must be less than 15",
    }),
});

module.exports = gradeValidationSchema;
