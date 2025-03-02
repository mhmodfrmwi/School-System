const mongoose = require("mongoose");

const examSchema = new mongoose.Schema(
  {
    title: {
      type: "String",
      required: [true, "Title is required"],
      trim: true,
      minlength: 5,
      maxlength: 100,
    },
    description: {
      type: "String",
      trim: true,
      maxlength: 500,
    },
    type: {
      type: "String",
      required: [true, "Type is required"],
      enum: ["Online", "Offline"],
      default: "Online",
    },
    subject_id: {
      type: "ObjectId",
      ref: "Subject",
      required: [true, "Subject ID is required"],
    },
    grade_id: {
      type: "ObjectId",
      ref: "Grade",
      required: [true, "Grade ID is required"],
    },
    class_id: {
      type: "ObjectId",
      ref: "Class",
      required: [true, "Class ID is required"],
    },
    academic_year_id: {
      type: "ObjectId",
      ref: "AcademicYear",
      required: [true, "Academic Year ID is required"],
    },
    semester_id: {
      type: "ObjectId",
      ref: "Semester",
      required: [true, "Semester ID is required"],
    },
    start_time: {
      type: "Date",
      required: [true, "Start time is required"],
    },
    end_time: {
      type: "Date",
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
      type: "ObjectId",
      ref: "Teacher",
      required: [true, "Created by (Teacher ID) is required"],
    },
    exam_questions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ExamQuestion",
      },
    ],
  },
  {
    timestamps: true,
  }
);
examSchema.virtual("exam_status").get(function () {
  const now = new Date();
  if (now >= this.start_time && now <= this.end_time) {
    return "Active";
  } else if (now < this.start_time) {
    return "Upcoming";
  } else {
    return "Expired";
  }
});

examSchema.set("toJSON", { virtuals: true });

const Exam = mongoose.model("Exam", examSchema);
module.exports = Exam;
