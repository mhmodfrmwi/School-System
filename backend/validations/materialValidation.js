const Joi = require("joi");

const materialValidationSchema = Joi.object({
  title: Joi.string().min(5).max(100).required().messages({
    "string.min": "Title must be at least 5 characters",
    "string.max": "Title cannot exceed 100 characters",
    "any.required": "Title is required",
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
  externalLink: Joi.string()
    .uri()
    .when("type", {
      // Add this field to your request body
      is: "Link",
      then: Joi.required().messages({
        "any.required": "External link is required for Link type",
        "string.uri": "Invalid URL format",
      }),
      otherwise: Joi.forbidden().messages({
        "any.unknown": "External link is not allowed for non-Link types",
      }),
    }),
  academicYear: Joi.string()
    .pattern(/^\d{4}-\d{4}$/)
    .required()
    .messages({
      "string.pattern.base": "Academic year must be in YYYY-YYYY format",
      "any.required": "Academic year is required",
    }),
  grade: Joi.string().required().messages({
    "any.required": "Grade is required",
  }),
  subject: Joi.string().required().messages({
    "any.required": "Subject is required",
  }),
  semester: Joi.string().required().messages({
    "any.required": "Semester is required",
  }),
});
module.exports = materialValidationSchema;
