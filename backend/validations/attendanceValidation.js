const Joi = require("joi");
const attendanceValidationSchema = Joi.object({
  studentName: Joi.string().required(),
  academicNumber: Joi.string().required(),
  status: Joi.string().valid("P", "A", "L").required(),
});
module.exports = attendanceValidationSchema;
