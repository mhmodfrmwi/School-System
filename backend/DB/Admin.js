const mongoose = require("mongoose");
const Joi = require("joi");

// Define Admin Schema
const adminSchema = new mongoose.Schema({
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

// Joi Validation for Admin
const validateAdmin = (obj) => {
  const schema = Joi.object({
    adminId: Joi.string().required().messages({
      "string.base": "Admin ID must be a valid ObjectId string.",
      "any.required": "Admin ID is required.",
    }),
  });

  return schema.validate(obj);
};

// Exporting the Model and Validation Function
module.exports = {
  Admin: mongoose.model("Admin", adminSchema),
  validateAdmin,
};
