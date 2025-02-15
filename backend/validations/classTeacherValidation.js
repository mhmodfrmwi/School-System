const Joi = require("joi");
const classTeacherValidationSchema = Joi.object({
  classId: Joi.string().required(),
  subjectName: Joi.string().required(),
  teacherName: Joi.string().required(),
  academicYear: Joi.string().required(),
});

module.exports = classTeacherValidationSchema;
