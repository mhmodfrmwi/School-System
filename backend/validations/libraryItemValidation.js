const joi = require("joi");

const libraryItemValidationSchema = joi.object({
  title: joi.string().min(3).max(100).required().messages({
    "string.min": "Title must be at least 3 characters long",
    "string.max": "Title cannot exceed 100 characters",
    "any.required": "Title is required",
  }),
  author: joi.string().min(3).max(100).required().messages({
    "string.min": "Author name must be at least 3 characters long",
    "string.max": "Author name cannot exceed 100 characters",
    "any.required": "Author is required",
  }),
  libraryUrl: joi.string().uri().required().messages({
    "string.uri": "Library URL must be a valid URL",
    "any.required": "Library URL is required",
  }),
});

module.exports = libraryItemValidationSchema;
