// models/ExamSchedule.js
const mongoose = require("mongoose");

const examSubjectSchema = new mongoose.Schema({
  subject_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subject",
    required: [true, "Subject ID is required"],
  },
  exam_date: {
    type: Date,
    required: [true, "Exam date is required"],
  },
  start_time: {
    type: String,
    required: [true, "Start time is required"],
    match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time format (HH:mm)"],
  },
  end_time: {
    type: String,
    required: [true, "End time is required"],
    match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time format (HH:mm)"],
    validate: {
      validator: function (value) {
        return value > this.start_time;
      },
      message: "End time must be after start time",
    },
  },
});

const examScheduleSchema = new mongoose.Schema(
  {
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
    grade_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Grade",
      required: [true, "Grade ID is required"],
    },
    subjects: [examSubjectSchema],
  },
  { timestamps: true }
);

examScheduleSchema.pre("save", async function (next) {
  const exams = await this.constructor.find({
    grade_id: this.grade_id,
    semester_id: this.semester_id,
    "subjects.exam_date": { $in: this.subjects.map((s) => s.exam_date) },
  });

  for (const subject of this.subjects) {
    const existing = exams.some((exam) =>
      exam.subjects.some(
        (s) =>
          s.exam_date.toDateString() === subject.exam_date.toDateString() &&
          ((s.start_time <= subject.start_time &&
            s.end_time >= subject.start_time) ||
            (s.start_time <= subject.end_time &&
              s.end_time >= subject.end_time))
      )
    );

    if (existing) {
      throw new Error(
        `Overlapping exam found for grade ${this.grade_id} in semester ${this.semester_id} on ${subject.exam_date}`
      );
    }
  }

  next();
});

module.exports = mongoose.model("ExamSchedule", examScheduleSchema);
