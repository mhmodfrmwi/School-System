const mongoose = require("mongoose");
const Joi = require("joi");

const gradeSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Student",
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Course",
  },
  assignmentScores: {
    type: [Number],
    required: true,
  },
  examScore: {
    type: Number,
    required: true,
  },
  totalScore: {
    type: Number,
    get: function () {
      return (
        this.assignmentScores.reduce((sum, score) => sum + score, 0) +
        this.examScore
      );
    },
  },
});

const Grade = mongoose.model("Grade", gradeSchema);

const gradeValidationSchema = Joi.object({
  studentId: Joi.object().required(),
  courseId: Joi.object().required(),
  assignmentScores: Joi.array().items(Joi.number()).min(1).max(10).required(),
  examScore: Joi.number().min(0).max(100).required(),
}).prefs({
  messages: {
    "any.required": "This field is required.",
    "object.base": "Invalid object structure.",
  },
});

function validateGrade(data) {
  return gradeValidationSchema.validate(data, { abortEarly: false });
}

module.exports = { Grade, validateGrade };
