const mongoose = require("mongoose");

const examSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      minlength: 5,
      maxlength: 100,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 500,
    },
    type: {
      type: String,
      required: [true, "Type is required"],
      enum: ["Online", "Offline"],
      default: "Online",
    },
    subject_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      required: [true, "Subject ID is required"],
    },
    grade_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Grade",
      required: [true, "Grade ID is required"],
    },
    class_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
      required: [true, "Class ID is required"],
    },
    academic_year_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AcademicYear",
      required: [true, "Academic Year ID is required"],
    },
    semester_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Semester",
      required: [true, "Semester ID is required"],
    },
    start_time: {
      type: Date,
      required: [true, "Start time is required"],
    },
    end_time: {
      type: Date,
      required: [true, "End time is required"],
    },
    duration: {
      type: "Number",
      required: [true, "Duration is required"],
      min: 0,
    },
    total_marks: {
      type: Number,
      required: [true, "Total marks is required"],
      min: 0,
    },
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
      required: [true, "Created by (Teacher ID) is required"],
    },
    questions: [
      {
        question_text: {
          type: String,
          required: [true, "Question text is required"],
          trim: true,
        },
        question_type: {
          type: String,
          required: [true, "Question type is required"],
          enum: ["MCQ", "True/False", "Essay"],
        },
        options: {
          type: [String],
          required: function () {
            return this.question_type === "MCQ";
          },
        },
        correct_answer: {
          type: String,
          required: function () {
            return this.question_type !== "Essay";
          },
        },
        marks: {
          type: Number,
          required: [true, "Marks are required"],
          min: 0,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Exam = mongoose.model("Exam", examSchema);
module.exports = Exam;
