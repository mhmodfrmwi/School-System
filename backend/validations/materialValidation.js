const Joi = require("joi");

const materialValidationSchema = Joi.object({
  title: Joi.string().min(5).max(100).required().messages({
    "string.min": "Title must be at least 5 characters",
    "string.max": "Title cannot exceed 100 characters",
    "any.required": "Title is required",
  }),
  description: Joi.string().required().messages({
    "string.required": "Description is required",
    "string.min": "Description must be at least 10 characters",
    "string.max": "Description cannot exceed 2000 characters",
  }),
  type: Joi.string()
    .valid("PDF", "Video", "Assignment", "Link")
    .required()
    .messages({
      "any.only": "Type must be PDF, Video, Assignment, or Link",
      "any.required": "Type is required",
    }),
  fileUrl: Joi.string().when("type", {
    is: Joi.not("Link"),
    then: Joi.required().messages({
      "any.required": "File URL is required for non-link materials",
    }),
    otherwise: Joi.forbidden().messages({
      "any.unknown": "File URL is not allowed for Link type",
    }),
  }),
});
module.exports = materialValidationSchema;
