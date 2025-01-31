const { Schema, model } = require("mongoose");

const materialSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      minlength: 5,
      maxlength: 100,
    },
    type: {
      type: String,
      required: true,
      enum: ["PDF", "Video", "Assignment", "Link"],
    },
    file_url: {
      type: String,
      required: function () {
        return this.type !== "Link";
      },
    },
    uploaded_by: {
      type: Schema.Types.ObjectId,
      ref: "Teacher",
      required: true,
    },
    grade_id: {
      type: Schema.Types.ObjectId,
      ref: "Grade",
      required: true,
    },
    subject_id: {
      type: Schema.Types.ObjectId,
      ref: "Subject",
      required: true,
    },
    academic_year_id: {
      type: Schema.Types.ObjectId,
      ref: "AcademicYear",
      required: true,
    },
    semester_id: {
      type: Schema.Types.ObjectId,
      ref: "Semester",
      required: true,
    },
  },
  { timestamps: true }
);

const Material = model("Material", materialSchema);
module.exports = Material;
