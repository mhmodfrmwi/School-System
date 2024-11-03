const mongoose = require("mongoose");
const Joi = require("joi");

// Define Boss Schema
const bossSchema = new mongoose.Schema({
  bossId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

// Joi Validation for Boss
const validateBoss = (obj) => {
  const schema = Joi.object({
    bossId: Joi.string().required().messages({
      "string.base": "Boss ID must be a valid ObjectId string.",
      "any.required": "Boss ID is required.",
    }),
  });

  return schema.validate(obj);
};

// Exporting the Model and Validation Function
module.exports = {
  Boss: mongoose.model("Boss", bossSchema),
  validateBoss,
};
