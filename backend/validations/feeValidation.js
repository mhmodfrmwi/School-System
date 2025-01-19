const feeValidationSchema = Joi.object({
  student_id: Joi.string().required(),
  academic_number: Joi.string().required(), // Add academic number
  fee_type: Joi.string().required(),
  amount: Joi.number().required(),
  due_date: Joi.date().required(),
  paid_date: Joi.date().allow(null),
  status: Joi.string().valid("Paid", "Unpaid").required(),
});

module.exports = feeValidationSchema;
