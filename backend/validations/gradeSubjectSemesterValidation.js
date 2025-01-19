const gradeSubjectSemesterValidationSchema = Joi.object({
  grade_subject_id: Joi.string().required(),
  semester_id: Joi.string().required(),
});

module.exports = gradeSubjectSemesterValidationSchema;
