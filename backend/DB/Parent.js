const mongoose = require("mongoose");
const Joi = require("joi");

// Define Parent Schema
const parentSchema = new mongoose.Schema({
  parentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  order: {
    type: Number,
    min: 1,
  },
});

// Joi Validation for Parent
const validateParent = (obj) => {
  const schema = Joi.object({
    parentId: Joi.string().required().messages({
      "string.base": "Parent ID must be a valid ObjectId string.",
      "any.required": "Parent ID is required.",
    }),

    order: Joi.number().integer().min(1).messages({
      "number.base": "Order must be a positive integer.",
      "number.min": "Order must be at least 1.",
    }),
  });

  return schema.validate(obj);
};

// Exporting the Model and Validation Function
module.exports = {
  Parent: mongoose.model("Parent", parentSchema),
  validateParent,
};
