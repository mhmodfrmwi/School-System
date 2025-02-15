const joi = require("joi");

const libraryItemForGradeValidationSchema = joi.object({
  title: joi.string().required().messages({
    "string.empty": "Title is required",
    "any.required": "Title is required",
  }),
  itemUrl: joi.string().uri().required().messages({
    "string.empty": "Item URL is required",
    "string.uri": "Item URL must be a valid URI",
    "any.required": "Item URL is required",
  }),
  description: joi.string().required().messages({
    "string.empty": "Description is required",
    "any.required": "Description is required",
  }),
  type: joi.string().valid("Video", "PDF").required().messages({
    "string.empty": "Type is required",
    "any.only": "Type must be either 'Video' or 'PDF'",
    "any.required": "Type is required",
  }),
  gradeSubjectSemesterId: joi.string().required().messages({
    "string.empty": "Grade subject semester ID is required",
    "any.required": "Grade subject semester ID is required",
  }),
});

module.exports = libraryItemForGradeValidationSchema;
