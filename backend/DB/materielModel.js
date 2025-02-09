const { Schema, model } = require("mongoose");

const materialSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      minlength: 5,
      maxlength: 100,
    },
    description: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 200,
    },
    class_id: {
      type: Schema.Types.ObjectId,
      ref: "Class",
      required: true,
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
    grade_subject_semester_id: {
      type: Schema.Types.ObjectId,
      ref: "GradeSubjectSemester",
      required: true,
    },
  },
  { timestamps: true }
);

const Material = model("Material", materialSchema);
module.exports = Material;
