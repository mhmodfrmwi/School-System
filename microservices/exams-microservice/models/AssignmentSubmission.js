const mongoose = require("mongoose");
const assignmentSubmissionSchema = mongoose.Schema(
  {
    assignment_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Assignment",
      required: [true, "Assignment ID is required"],
    },
    student_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: [true, "Student ID is required"],
    },
    submission_text: {
      type: String,
      trim: true,
      maxlength: 5000,
    },
    attachments: {
      type: [String],
      default: [],
    },
    submitted_at: {
      type: Date,
      default: Date.now,
    },
    grade: {
      type: Number,
      min: 0,
    },
  },
  { timestamps: true }
);

assignmentSubmissionSchema.methods.getStatus = async function () {
  const assignment = await this.constructor
    .model("Assignment")
    .findById(this.assignment_id)
    .exec();

  if (!assignment) {
    throw new Error("Assignment not found");
  }

  console.log(this.submitted_at);
  console.log(assignment.due_date);

  if (this.submitted_at > assignment.due_date) {
    return "Late";
  }
  return "On time";
};
assignmentSubmissionSchema.set("toJSON", { virtuals: true });

const AssignmentSubmission = mongoose.model(
  "AssignmentSubmission",
  assignmentSubmissionSchema
);
module.exports = AssignmentSubmission;
