const mongoose = require("mongoose");
const Joi = require("joi");
const path = require("path");
const termSchema = new mongoose.Schema({
  startYear: {
    type: String,
    required: true,
  },
  endYear: {
    type: String,
    required: true,
  },
  term: {
    type: String,
    required: true,
    enum: ["term 1", "term 2"],
  },
});
const validateTermForm = (obj) => {
  const schema = Joi.object({
    startYear: Joi.string().min(4).max(4).required(),
    endYear: Joi.string().min(4).max(4).required(),
    term: Joi.string().required(),
  });
  return schema.validate(obj);
};
const Term = mongoose.model("Term", termSchema);
module.exports = {
  Term,
  validateTermForm,
};
